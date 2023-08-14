// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  userRecordsDataValidator,
  userRecordsPatchValidator,
  userRecordsQueryValidator,
  userRecordsResolver,
  userRecordsExternalResolver,
  userRecordsDataResolver,
  userRecordsPatchResolver,
  userRecordsQueryResolver
} from './user-records.schema'

import type { Application } from '../../declarations'
import { UserRecordsService, getOptions } from './user-records.class'
import { userRecordsPath, userRecordsMethods } from './user-records.shared'

export * from './user-records.class'
export * from './user-records.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const userRecords = (app: Application) => {
  // Register our service on the Feathers application
  app.use(userRecordsPath, new UserRecordsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: userRecordsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(userRecordsPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(userRecordsExternalResolver),
        schemaHooks.resolveResult(userRecordsResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(userRecordsQueryValidator), schemaHooks.resolveQuery(userRecordsQueryResolver)],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(userRecordsDataValidator),
        schemaHooks.resolveData(userRecordsDataResolver)
      ],
      patch: [schemaHooks.validateData(userRecordsPatchValidator), schemaHooks.resolveData(userRecordsPatchResolver)],
      remove: []
    },
    after: {
      all: [],
      create: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [userRecordsPath]: UserRecordsService
  }
}
