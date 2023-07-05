import type { DiscogsSearchResult, HookContext, NextFunction } from '../../../declarations'
import axios from 'axios'

export const searchDiscogs = async (context: HookContext) => {
  const {
    params: { query: { name = '' } = {} }
  } = context

  if (name) {
    const response = await axios({
      method: 'get',
      url: `https://api.discogs.com/database/search?q=${name}&format=album&type=master`,
      headers: {
        Authorization: `Discogs key=${process.env.DISCOGS_KEY}, secret=${process.env.DISCOGS_SECRET}`
      }
    })

    const results: DiscogsSearchResult[] = response.data.results

    const result = results.map(
      ({ title, year, thumb, cover_image: coverImage, master_id: masterId, genre, style }) => {
        const [artist, album] = title.split(' - ')

        return {
          name: album,
          year,
          smallImageUrl: thumb,
          largeImageUrl: coverImage,
          discogsMasterId: masterId,
          artist: { name: artist },
          genres: [...genre, ...style]
        }
      }
    )

    context.result = result
  }
}
