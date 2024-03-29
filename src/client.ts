// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers'
import type { TransportConnection, Application } from '@feathersjs/feathers'
import authenticationClient from '@feathersjs/authentication-client'
import type { AuthenticationClientOptions } from '@feathersjs/authentication-client'

import { trackFeaturedArtistsClient } from './services/track-featured-artists/track-featured-artists.shared'
export type {
  TrackFeaturedArtists,
  TrackFeaturedArtistsData,
  TrackFeaturedArtistsQuery,
  TrackFeaturedArtistsPatch
} from './services/track-featured-artists/track-featured-artists.shared'

import { tracksClient } from './services/tracks/tracks.shared'
export type { Tracks, TracksData, TracksQuery, TracksPatch } from './services/tracks/tracks.shared'

import { recordGenreClient } from './services/record-genre/record-genre.shared'
export type {
  RecordGenre,
  RecordGenreData,
  RecordGenreQuery,
  RecordGenrePatch
} from './services/record-genre/record-genre.shared'

import { recordGenresClient } from './services/record-genres/record-genres.shared'
export type {
  RecordGenres,
  RecordGenresData,
  RecordGenresQuery,
  RecordGenresPatch
} from './services/record-genres/record-genres.shared'

import { genresClient } from './services/genres/genres.shared'
export type { Genres, GenresData, GenresQuery, GenresPatch } from './services/genres/genres.shared'

import { artistsClient } from './services/artists/artists.shared'
export type { Artists, ArtistsData, ArtistsQuery, ArtistsPatch } from './services/artists/artists.shared'

import { recordBinsClient } from './services/record-bins/record-bins.shared'
export type {
  RecordBin,
  RecordBinsData,
  RecordBinsQuery,
  RecordBinsPatch
} from './services/record-bins/record-bins.shared'

import { binsClient } from './services/bins/bins.shared'
export type { Bins, BinsData, BinsQuery, BinsPatch } from './services/bins/bins.shared'

import { recordsClient } from './services/records/records.shared'
export type { Records, RecordsData, RecordsQuery, RecordsPatch } from './services/records/records.shared'

import { userRecordsClient } from './services/user-records/user-records.shared'
export type {
  UserRecords,
  UserRecordsData,
  UserRecordsQuery,
  UserRecordsPatch
} from './services/user-records/user-records.shared'

import { userClient } from './services/users/users.shared'
export type { User, UserData, UserQuery, UserPatch } from './services/users/users.shared'

export interface Configuration {
  connection: TransportConnection<ServiceTypes>
}

export interface ServiceTypes {}

export type ClientApplication = Application<ServiceTypes, Configuration>

/**
 * Returns a typed client for the groovebase-api app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
export const createClient = <Configuration = any>(
  connection: TransportConnection<ServiceTypes>,
  authenticationOptions: Partial<AuthenticationClientOptions> = {}
) => {
  const client: ClientApplication = feathers()

  client.configure(connection)
  client.configure(authenticationClient(authenticationOptions))
  client.set('connection', connection)

  client.configure(userClient)
  client.configure(recordsClient)
  client.configure(userRecordsClient)
  client.configure(binsClient)
  client.configure(recordBinsClient)
  client.configure(artistsClient)
  client.configure(genresClient)
  client.configure(recordGenresClient)
  client.configure(recordGenreClient)
  client.configure(tracksClient)
  client.configure(trackFeaturedArtistsClient)
  return client
}
