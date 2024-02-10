import { trackFeaturedArtists } from './track-featured-artists/track-featured-artists'
import { tracks } from './tracks/tracks'
import { recordGenre } from './record-genre/record-genre'
import { genres } from './genres/genres'
import { recordBins } from './record-bins/record-bins'
import { bins } from './bins/bins'
import { records } from './records/records'
import { user } from './users/users'
import { userRecords } from './user-records/user-records'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(trackFeaturedArtists)
  app.configure(tracks)
  app.configure(recordGenre)
  app.configure(genres)
  app.configure(recordBins)
  app.configure(bins)
  app.configure(records)
  app.configure(user)
  app.configure(userRecords)
  // All services will be registered here
}
