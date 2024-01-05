// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  recordBinsDataValidator,
  recordBinsPatchValidator,
  recordBinsQueryValidator,
  recordBinsResolver,
  recordBinsExternalResolver,
  recordBinsDataResolver,
  recordBinsPatchResolver,
  recordBinsQueryResolver
} from './record-bins.schema'

import type { Application } from '../../declarations'
import { RecordBinsService, getOptions } from './record-bins.class'
import { recordBinsPath, recordBinsMethods } from './record-bins.shared'
import removeExistingBins from './hooks/remove-existing-bins'
import addUserId from './hooks/add-user-id'

export * from './record-bins.class'
export * from './record-bins.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const recordBins = (app: Application) => {
  // Register our service on the Feathers application
  app.use(recordBinsPath, new RecordBinsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: recordBinsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(recordBinsPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(recordBinsExternalResolver),
        schemaHooks.resolveResult(recordBinsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(recordBinsQueryValidator),
        schemaHooks.resolveQuery(recordBinsQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(recordBinsDataValidator),
        removeExistingBins(),
        addUserId(),
        schemaHooks.resolveData(recordBinsDataResolver)
      ],
      patch: [
        schemaHooks.validateData(recordBinsPatchValidator),
        schemaHooks.resolveData(recordBinsPatchResolver)
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
    [recordBinsPath]: RecordBinsService
  }
}
