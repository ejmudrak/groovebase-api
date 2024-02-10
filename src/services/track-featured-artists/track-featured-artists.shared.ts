// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  TrackFeaturedArtists,
  TrackFeaturedArtistsData,
  TrackFeaturedArtistsPatch,
  TrackFeaturedArtistsQuery,
  TrackFeaturedArtistsService
} from './track-featured-artists.class'

export type {
  TrackFeaturedArtists,
  TrackFeaturedArtistsData,
  TrackFeaturedArtistsPatch,
  TrackFeaturedArtistsQuery
}

export type TrackFeaturedArtistsClientService = Pick<
  TrackFeaturedArtistsService<Params<TrackFeaturedArtistsQuery>>,
  (typeof trackFeaturedArtistsMethods)[number]
>

export const trackFeaturedArtistsPath = 'track-featured-artists'

export const trackFeaturedArtistsMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const trackFeaturedArtistsClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(trackFeaturedArtistsPath, connection.service(trackFeaturedArtistsPath), {
    methods: trackFeaturedArtistsMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [trackFeaturedArtistsPath]: TrackFeaturedArtistsClientService
  }
}
