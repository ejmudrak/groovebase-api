// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { RecordBin, RecordBinsData, RecordBinsPatch, RecordBinsQuery } from './record-bins.schema'

export type { RecordBin, RecordBinsData, RecordBinsPatch, RecordBinsQuery }

export interface RecordBinsParams extends KnexAdapterParams<RecordBinsQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class RecordBinsService<ServiceParams extends Params = RecordBinsParams> extends KnexService<
  RecordBin,
  RecordBinsData,
  RecordBinsParams,
  RecordBinsPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'record_bins',
    multi: ['create', 'remove']
  }
}
