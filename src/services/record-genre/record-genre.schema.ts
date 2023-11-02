// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const recordGenreSchema = Type.Object(
  {
    id: Type.Number(),
    recordId: Type.Number(),
    genreId: Type.Number()
  },
  { $id: 'RecordGenre', additionalProperties: false }
)
export type RecordGenre = Static<typeof recordGenreSchema>
export const recordGenreValidator = getValidator(recordGenreSchema, dataValidator)
export const recordGenreResolver = resolve<RecordGenre, HookContext>({})

export const recordGenreExternalResolver = resolve<RecordGenre, HookContext>({})

// Schema for creating new entries
export const recordGenreDataSchema = Type.Pick(recordGenreSchema, ['recordId', 'genreId'], {
  $id: 'RecordGenreData'
})
export type RecordGenreData = Static<typeof recordGenreDataSchema>
export const recordGenreDataValidator = getValidator(recordGenreDataSchema, dataValidator)
export const recordGenreDataResolver = resolve<RecordGenre, HookContext>({})

// Schema for updating existing entries
export const recordGenrePatchSchema = Type.Partial(recordGenreSchema, {
  $id: 'RecordGenrePatch'
})
export type RecordGenrePatch = Static<typeof recordGenrePatchSchema>
export const recordGenrePatchValidator = getValidator(recordGenrePatchSchema, dataValidator)
export const recordGenrePatchResolver = resolve<RecordGenre, HookContext>({})

// Schema for allowed query properties
export const recordGenreQueryProperties = Type.Pick(recordGenreSchema, ['id', 'recordId', 'genreId'])
export const recordGenreQuerySchema = Type.Intersect(
  [
    querySyntax(recordGenreQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type RecordGenreQuery = Static<typeof recordGenreQuerySchema>
export const recordGenreQueryValidator = getValidator(recordGenreQuerySchema, queryValidator)
export const recordGenreQueryResolver = resolve<RecordGenreQuery, HookContext>({})
