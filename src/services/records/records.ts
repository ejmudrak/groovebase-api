// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  recordsDataValidator,
  recordsPatchValidator,
  recordsQueryValidator,
  recordsResolver,
  recordsExternalResolver,
  recordsDataResolver,
  recordsPatchResolver,
  recordsQueryResolver
} from './records.schema'

import type { Application } from '../../declarations'
import { RecordsService, getOptions } from './records.class'
import { recordsPath, recordsMethods } from './records.shared'
import { searchDiscogs } from './hooks/discogs-search'
import { getDiscogsCollection } from './hooks/discogs-get-collection'
import { importDiscogsCollection } from './hooks/discogs-import-collection'
import { scoopDataForAfter } from './hooks/scoop-data-for-after'
import { filterRecordsByUserId } from './hooks/filter-records-by-user-id'

export * from './records.class'
export * from './records.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const records = (app: Application) => {
  // Register our service on the Feathers application
  app.use(recordsPath, new RecordsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: recordsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(recordsPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(recordsExternalResolver),
        schemaHooks.resolveResult(recordsResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(recordsQueryValidator), schemaHooks.resolveQuery(recordsQueryResolver)],
      find: [searchDiscogs, getDiscogsCollection, filterRecordsByUserId],
      get: [],
      create: [
        scoopDataForAfter,
        schemaHooks.validateData(recordsDataValidator),
        importDiscogsCollection,
        schemaHooks.resolveData(recordsDataResolver)
      ],
      patch: [schemaHooks.validateData(recordsPatchValidator), schemaHooks.resolveData(recordsPatchResolver)],
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
    [recordsPath]: RecordsService
  }
}
