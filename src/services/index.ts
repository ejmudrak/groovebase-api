import { records } from './records/records'
import { user } from './users/users'
import { userRecords } from './user-records/user-records'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(records)
  app.configure(user)
  app.configure(userRecords)
  // All services will be registered here
}
