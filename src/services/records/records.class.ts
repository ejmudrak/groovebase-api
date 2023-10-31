// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Record, RecordsData, RecordsPatch, RecordsQuery } from './records.schema'

export type { Record, RecordsData, RecordsPatch, RecordsQuery }

export interface RecordsParams extends KnexAdapterParams<RecordsQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class RecordsService<ServiceParams extends Params = RecordsParams> extends KnexService<
  Record,
  RecordsData,
  RecordsParams,
  RecordsPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'records'
  }
}
