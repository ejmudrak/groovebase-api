// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  UserRecord,
  UserRecordsData,
  UserRecordsPatch,
  UserRecordsQuery,
  UserRecordsService
} from './user-records.class'

export type { UserRecord, UserRecordsData, UserRecordsPatch, UserRecordsQuery }

export type UserRecordsClientService = Pick<
  UserRecordsService<Params<UserRecordsQuery>>,
  (typeof userRecordsMethods)[number]
>

export const userRecordsPath = 'user-records'

export const userRecordsMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const userRecordsClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(userRecordsPath, connection.service(userRecordsPath), {
    methods: userRecordsMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [userRecordsPath]: UserRecordsClientService
  }
}
