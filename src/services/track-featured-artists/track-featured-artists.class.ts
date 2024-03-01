// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type {
  TrackFeaturedArtists,
  TrackFeaturedArtistsData,
  TrackFeaturedArtistsPatch,
  TrackFeaturedArtistsQuery
} from './track-featured-artists.schema'

export type {
  TrackFeaturedArtists,
  TrackFeaturedArtistsData,
  TrackFeaturedArtistsPatch,
  TrackFeaturedArtistsQuery
}

export interface TrackFeaturedArtistsParams extends KnexAdapterParams<TrackFeaturedArtistsQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class TrackFeaturedArtistsService<
  ServiceParams extends Params = TrackFeaturedArtistsParams
> extends KnexService<
  TrackFeaturedArtists,
  TrackFeaturedArtistsData,
  TrackFeaturedArtistsParams,
  TrackFeaturedArtistsPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'track_featured_artists',
    multi: ['create']
  }
}
