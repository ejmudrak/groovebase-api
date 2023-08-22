// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Bins, BinsData, BinsPatch, BinsQuery, BinsService } from './bins.class'

export type { Bins, BinsData, BinsPatch, BinsQuery }

export type BinsClientService = Pick<BinsService<Params<BinsQuery>>, (typeof binsMethods)[number]>

export const binsPath = 'bins'

export const binsMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const binsClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(binsPath, connection.service(binsPath), {
    methods: binsMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [binsPath]: BinsClientService
  }
}
