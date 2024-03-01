/* add-tracks.ts
  Fetches master release data for the record to get tracklist data,
    then creates db records for those tracks
 */
import axios from 'axios'
import type { DiscogsMasterResult, HookContext } from '../../../declarations'
import { TrackFeaturedArtistsData } from '../../track-featured-artists/track-featured-artists.schema'
import { TracksData } from '../../tracks/tracks.schema'

export const addTracks = async (context: HookContext) => {
  const {
    app,
    params: { skipAfterHooks },
    result
  } = context

  if (!skipAfterHooks && result.discogsMasterId) {
    // fetches Discogs master release data, because it includes the tracklist
    const response = await axios({
      method: 'get',
      url: `https://api.discogs.com/masters/${result.discogsMasterId}`,
      headers: {
        Authorization: `Discogs key=${process.env.DISCOGS_KEY}, secret=${process.env.DISCOGS_SECRET}`
      }
    })

    // Create the tracks
    const { tracklist }: DiscogsMasterResult = response.data
    const tracksPayload: TracksData[] = tracklist.map(({ title, duration, position }) => ({
      name: title,
      duration,
      position,
      recordId: result.id
    }))

    const tracks = await app.service('tracks').create(tracksPayload)

    // Gather and add the featured artist(s) to the tracks
    const featuredArtistsPayload: TrackFeaturedArtistsData[] = []
    tracklist.forEach(({ extraartists: featuredArtists = [], position }) => {
      const createdTrack = tracks.find((t) => t.position === position)

      if (featuredArtists?.length > 0 && createdTrack) {
        featuredArtists.forEach((featuredArtist) => {
          // We only want the featured artist(s) for the track, otherwise we'll get mixing/producers/etc
          if (featuredArtist.role === 'Featuring') {
            featuredArtistsPayload.push({
              artist: featuredArtist.name,
              trackId: createdTrack.id
            })
          }
        })
      }
    })

    if (featuredArtistsPayload.length) {
      try {
        await app.service('track-featured-artists').create(featuredArtistsPayload)
      } catch (e) {
        console.error('Error adding featured artists:', e)
      }
    }
  }
}
