// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Tracks, TracksData, TracksPatch, TracksQuery } from './tracks.schema'

export type { Tracks, TracksData, TracksPatch, TracksQuery }

export interface TracksParams extends KnexAdapterParams<TracksQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class TracksService<ServiceParams extends Params = TracksParams> extends KnexService<
  Tracks,
  TracksData,
  TracksParams,
  TracksPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'tracks',
    multi: ['create']
  }
}
