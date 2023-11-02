// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  recordGenreDataValidator,
  recordGenrePatchValidator,
  recordGenreQueryValidator,
  recordGenreResolver,
  recordGenreExternalResolver,
  recordGenreDataResolver,
  recordGenrePatchResolver,
  recordGenreQueryResolver
} from './record-genre.schema'

import type { Application } from '../../declarations'
import { RecordGenreService, getOptions } from './record-genre.class'
import { recordGenrePath, recordGenreMethods } from './record-genre.shared'

export * from './record-genre.class'
export * from './record-genre.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const recordGenre = (app: Application) => {
  // Register our service on the Feathers application
  app.use(recordGenrePath, new RecordGenreService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: recordGenreMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(recordGenrePath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(recordGenreExternalResolver),
        schemaHooks.resolveResult(recordGenreResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(recordGenreQueryValidator),
        schemaHooks.resolveQuery(recordGenreQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(recordGenreDataValidator),
        schemaHooks.resolveData(recordGenreDataResolver)
      ],
      patch: [
        schemaHooks.validateData(recordGenrePatchValidator),
        schemaHooks.resolveData(recordGenrePatchResolver)
      ],
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
    [recordGenrePath]: RecordGenreService
  }
}
