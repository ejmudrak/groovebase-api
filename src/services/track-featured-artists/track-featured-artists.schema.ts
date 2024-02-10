// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const trackFeaturedArtistsSchema = Type.Object(
  {
    id: Type.Number(),
    artist: Type.String(),
    trackId: Type.Integer(),
    createdAt: Type.String({ format: 'date-time' }),
    updatedAt: Type.String({ format: 'date-time' })
  },
  { $id: 'TrackFeaturedArtists', additionalProperties: false }
)
export type TrackFeaturedArtists = Static<typeof trackFeaturedArtistsSchema>
export const trackFeaturedArtistsValidator = getValidator(trackFeaturedArtistsSchema, dataValidator)
export const trackFeaturedArtistsResolver = resolve<TrackFeaturedArtists, HookContext>({})

export const trackFeaturedArtistsExternalResolver = resolve<TrackFeaturedArtists, HookContext>({})

// Schema for creating new entries
export const trackFeaturedArtistsDataSchema = Type.Pick(trackFeaturedArtistsSchema, ['artist', 'trackId'], {
  $id: 'TrackFeaturedArtistsData'
})
export type TrackFeaturedArtistsData = Static<typeof trackFeaturedArtistsDataSchema>
export const trackFeaturedArtistsDataValidator = getValidator(trackFeaturedArtistsDataSchema, dataValidator)
export const trackFeaturedArtistsDataResolver = resolve<TrackFeaturedArtists, HookContext>({})

// Schema for updating existing entries
export const trackFeaturedArtistsPatchSchema = Type.Partial(trackFeaturedArtistsSchema, {
  $id: 'TrackFeaturedArtistsPatch'
})
export type TrackFeaturedArtistsPatch = Static<typeof trackFeaturedArtistsPatchSchema>
export const trackFeaturedArtistsPatchValidator = getValidator(trackFeaturedArtistsPatchSchema, dataValidator)
export const trackFeaturedArtistsPatchResolver = resolve<TrackFeaturedArtists, HookContext>({})

// Schema for allowed query properties
export const trackFeaturedArtistsQueryProperties = Type.Pick(trackFeaturedArtistsSchema, [
  'id',
  'artist',
  'trackId'
])
export const trackFeaturedArtistsQuerySchema = Type.Intersect(
  [
    querySyntax(trackFeaturedArtistsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type TrackFeaturedArtistsQuery = Static<typeof trackFeaturedArtistsQuerySchema>
export const trackFeaturedArtistsQueryValidator = getValidator(
  trackFeaturedArtistsQuerySchema,
  queryValidator
)
export const trackFeaturedArtistsQueryResolver = resolve<TrackFeaturedArtistsQuery, HookContext>({})
