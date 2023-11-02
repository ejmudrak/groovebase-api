// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  genresDataValidator,
  genresPatchValidator,
  genresQueryValidator,
  genresResolver,
  genresExternalResolver,
  genresDataResolver,
  genresPatchResolver,
  genresQueryResolver
} from './genres.schema'

import type { Application } from '../../declarations'
import { GenresService, getOptions } from './genres.class'
import { genresPath, genresMethods } from './genres.shared'
import { filterGenresByRecordId } from './hooks/filter-genres-by-record-id'

export * from './genres.class'
export * from './genres.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const genres = (app: Application) => {
  // Register our service on the Feathers application
  app.use(genresPath, new GenresService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: genresMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(genresPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(genresExternalResolver),
        schemaHooks.resolveResult(genresResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(genresQueryValidator),
        filterGenresByRecordId,
        schemaHooks.resolveQuery(genresQueryResolver)
      ],
      find: [],
      get: [],
      create: [schemaHooks.validateData(genresDataValidator), schemaHooks.resolveData(genresDataResolver)],
      patch: [schemaHooks.validateData(genresPatchValidator), schemaHooks.resolveData(genresPatchResolver)],
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
    [genresPath]: GenresService
  }
}
