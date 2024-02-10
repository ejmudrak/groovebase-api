// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  trackFeaturedArtistsDataValidator,
  trackFeaturedArtistsPatchValidator,
  trackFeaturedArtistsQueryValidator,
  trackFeaturedArtistsResolver,
  trackFeaturedArtistsExternalResolver,
  trackFeaturedArtistsDataResolver,
  trackFeaturedArtistsPatchResolver,
  trackFeaturedArtistsQueryResolver
} from './track-featured-artists.schema'

import type { Application } from '../../declarations'
import { TrackFeaturedArtistsService, getOptions } from './track-featured-artists.class'
import { trackFeaturedArtistsPath, trackFeaturedArtistsMethods } from './track-featured-artists.shared'

export * from './track-featured-artists.class'
export * from './track-featured-artists.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const trackFeaturedArtists = (app: Application) => {
  // Register our service on the Feathers application
  app.use(trackFeaturedArtistsPath, new TrackFeaturedArtistsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: trackFeaturedArtistsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(trackFeaturedArtistsPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(trackFeaturedArtistsExternalResolver),
        schemaHooks.resolveResult(trackFeaturedArtistsResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(trackFeaturedArtistsQueryValidator),
        schemaHooks.resolveQuery(trackFeaturedArtistsQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(trackFeaturedArtistsDataValidator),
        schemaHooks.resolveData(trackFeaturedArtistsDataResolver)
      ],
      patch: [
        schemaHooks.validateData(trackFeaturedArtistsPatchValidator),
        schemaHooks.resolveData(trackFeaturedArtistsPatchResolver)
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
    [trackFeaturedArtistsPath]: TrackFeaturedArtistsService
  }
}
