// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Tracks, TracksData, TracksPatch, TracksQuery, TracksService } from './tracks.class'

export type { Tracks, TracksData, TracksPatch, TracksQuery }

export type TracksClientService = Pick<TracksService<Params<TracksQuery>>, (typeof tracksMethods)[number]>

export const tracksPath = 'tracks'

export const tracksMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const tracksClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(tracksPath, connection.service(tracksPath), {
    methods: tracksMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [tracksPath]: TracksClientService
  }
}
