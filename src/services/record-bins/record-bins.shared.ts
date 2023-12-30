// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  RecordBin,
  RecordBinsData,
  RecordBinsPatch,
  RecordBinsQuery,
  RecordBinsService
} from './record-bins.class'

export type { RecordBin, RecordBinsData, RecordBinsPatch, RecordBinsQuery }

export type RecordBinsClientService = Pick<
  RecordBinsService<Params<RecordBinsQuery>>,
  (typeof recordBinsMethods)[number]
>

export const recordBinsPath = 'record-bins'

export const recordBinsMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const recordBinsClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(recordBinsPath, connection.service(recordBinsPath), {
    methods: recordBinsMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [recordBinsPath]: RecordBinsClientService
  }
}
