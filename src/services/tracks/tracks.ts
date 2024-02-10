// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  tracksDataValidator,
  tracksPatchValidator,
  tracksQueryValidator,
  tracksResolver,
  tracksExternalResolver,
  tracksDataResolver,
  tracksPatchResolver,
  tracksQueryResolver
} from './tracks.schema'

import type { Application } from '../../declarations'
import { TracksService, getOptions } from './tracks.class'
import { tracksPath, tracksMethods } from './tracks.shared'

export * from './tracks.class'
export * from './tracks.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const tracks = (app: Application) => {
  // Register our service on the Feathers application
  app.use(tracksPath, new TracksService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: tracksMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(tracksPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(tracksExternalResolver),
        schemaHooks.resolveResult(tracksResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(tracksQueryValidator), schemaHooks.resolveQuery(tracksQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(tracksDataValidator), schemaHooks.resolveData(tracksDataResolver)],
      patch: [schemaHooks.validateData(tracksPatchValidator), schemaHooks.resolveData(tracksPatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [tracksPath]: TracksService
  }
}
