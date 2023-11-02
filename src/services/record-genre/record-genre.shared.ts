// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  RecordGenre,
  RecordGenreData,
  RecordGenrePatch,
  RecordGenreQuery,
  RecordGenreService
} from './record-genre.class'

export type { RecordGenre, RecordGenreData, RecordGenrePatch, RecordGenreQuery }

export type RecordGenreClientService = Pick<
  RecordGenreService<Params<RecordGenreQuery>>,
  (typeof recordGenreMethods)[number]
>

export const recordGenrePath = 'record-genre'

export const recordGenreMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const recordGenreClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(recordGenrePath, connection.service(recordGenrePath), {
    methods: recordGenreMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [recordGenrePath]: RecordGenreClientService
  }
}
