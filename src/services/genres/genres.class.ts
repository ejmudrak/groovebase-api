// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Genres, GenresData, GenresPatch, GenresQuery } from './genres.schema'

export type { Genres, GenresData, GenresPatch, GenresQuery }

export interface GenresParams extends KnexAdapterParams<GenresQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class GenresService<ServiceParams extends Params = GenresParams> extends KnexService<
  Genres,
  GenresData,
  GenresParams,
  GenresPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'genres',
    multi: ['create']
  }
}
