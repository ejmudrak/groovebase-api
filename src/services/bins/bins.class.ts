// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Bins, BinsData, BinsPatch, BinsQuery } from './bins.schema'

export type { Bins, BinsData, BinsPatch, BinsQuery }

export interface BinsParams extends KnexAdapterParams<BinsQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class BinsService<ServiceParams extends Params = BinsParams> extends KnexService<
  Bins,
  BinsData,
  BinsParams,
  BinsPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'bins'
  }
}
