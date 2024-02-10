// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const tracksSchema = Type.Object(
  {
    id: Type.Number(),
    name: Type.String(),
    duration: Type.String(),
    position: Type.String(),
    recordId: Type.Integer(),
    createdAt: Type.String({ format: 'date-time' }),
    updatedAt: Type.String({ format: 'date-time' })
  },
  { $id: 'Tracks', additionalProperties: false }
)
export type Tracks = Static<typeof tracksSchema>
export const tracksValidator = getValidator(tracksSchema, dataValidator)
export const tracksResolver = resolve<Tracks, HookContext>({})

export const tracksExternalResolver = resolve<Tracks, HookContext>({})

// Schema for creating new entries
export const tracksDataSchema = Type.Pick(tracksSchema, ['name', 'duration', 'position', 'recordId'], {
  $id: 'TracksData'
})
export type TracksData = Static<typeof tracksDataSchema>
export const tracksDataValidator = getValidator(tracksDataSchema, dataValidator)
export const tracksDataResolver = resolve<Tracks, HookContext>({})

// Schema for updating existing entries
export const tracksPatchSchema = Type.Partial(tracksSchema, {
  $id: 'TracksPatch'
})
export type TracksPatch = Static<typeof tracksPatchSchema>
export const tracksPatchValidator = getValidator(tracksPatchSchema, dataValidator)
export const tracksPatchResolver = resolve<Tracks, HookContext>({})

// Schema for allowed query properties
export const tracksQueryProperties = Type.Pick(tracksSchema, [
  'id',
  'name',
  'duration',
  'position',
  'recordId'
])
export const tracksQuerySchema = Type.Intersect(
  [
    querySyntax(tracksQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type TracksQuery = Static<typeof tracksQuerySchema>
export const tracksQueryValidator = getValidator(tracksQuerySchema, queryValidator)
export const tracksQueryResolver = resolve<TracksQuery, HookContext>({})
