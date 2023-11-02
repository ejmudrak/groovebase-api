// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Genres, GenresData, GenresPatch, GenresQuery, GenresService } from './genres.class'

export type { Genres, GenresData, GenresPatch, GenresQuery }

export type GenresClientService = Pick<GenresService<Params<GenresQuery>>, (typeof genresMethods)[number]>

export const genresPath = 'genres'

export const genresMethods = ['find', 'get', 'create', 'patch', 'remove'] as const

export const genresClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(genresPath, connection.service(genresPath), {
    methods: genresMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [genresPath]: GenresClientService
  }
}
