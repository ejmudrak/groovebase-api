// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { UserRecord, UserRecordsData, UserRecordsPatch, UserRecordsQuery } from './user-records.schema'

export type { UserRecord, UserRecordsData, UserRecordsPatch, UserRecordsQuery }

export interface UserRecordsParams extends KnexAdapterParams<UserRecordsQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class UserRecordsService<ServiceParams extends Params = UserRecordsParams> extends KnexService<
  UserRecord,
  UserRecordsData,
  UserRecordsParams,
  UserRecordsPatch
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'user_records'
  }
}
