// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  binsDataValidator,
  binsPatchValidator,
  binsQueryValidator,
  binsResolver,
  binsExternalResolver,
  binsDataResolver,
  binsPatchResolver,
  binsQueryResolver
} from './bins.schema'

import type { Application } from '../../declarations'
import { BinsService, getOptions } from './bins.class'
import { binsPath, binsMethods } from './bins.shared'

export * from './bins.class'
export * from './bins.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const bins = (app: Application) => {
  // Register our service on the Feathers application
  app.use(binsPath, new BinsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: binsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(binsPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(binsExternalResolver),
        schemaHooks.resolveResult(binsResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(binsQueryValidator), schemaHooks.resolveQuery(binsQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(binsDataValidator), schemaHooks.resolveData(binsDataResolver)],
      patch: [schemaHooks.validateData(binsPatchValidator), schemaHooks.resolveData(binsPatchResolver)],
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
    [binsPath]: BinsService
  }
}
