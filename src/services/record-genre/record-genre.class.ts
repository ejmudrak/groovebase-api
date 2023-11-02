// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { RecordGenre, RecordGenreData, RecordGenrePatch, RecordGenreQuery } from './record-genre.schema'

export type { RecordGenre, RecordGenreData, RecordGenrePatch, RecordGenreQuery }

export interface RecordGenreParams extends KnexAdapterParams<RecordGenreQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class RecordGenreService<ServiceParams extends Params = RecordGenreParams> extends KnexService<
  RecordGenre,
  RecordGenreData,
  RecordGenreParams,
  RecordGenrePatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'record_genres',
    multi: ['create']
  }
}
