// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Record, RecordsData, RecordsPatch, RecordsQuery, RecordsService } from './records.class'

export type { Record, RecordsData, RecordsPatch, RecordsQuery }

export type RecordsClientService = Pick<RecordsService<Params<RecordsQuery>>, (typeof recordsMethods)[number]>

export const recordsPath = 'records'

export const recordsMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const recordsClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(recordsPath, connection.service(recordsPath), {
    methods: recordsMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [recordsPath]: RecordsClientService
  }
}
