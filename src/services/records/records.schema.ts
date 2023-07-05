// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const recordsSchema = Type.Object(
  {
    id: Type.Number(),
    name: Type.String(),
    year: Type.Number(),
    smallImageUrl: Type.String(),
    largeImageUrl: Type.String(),
    discogsMasterId: Type.Number(),
    artist: Type.Any(),
    genres: Type.Array(Type.String()),
    createdAt: Type.String({ format: 'date-time' }),
    updatedAt: Type.String({ format: 'date-time' })
  },
  { $id: 'Records', additionalProperties: false }
)
export type Records = Static<typeof recordsSchema>
export const recordsValidator = getValidator(recordsSchema, dataValidator)
export const recordsResolver = resolve<Records, HookContext>({})

export const recordsExternalResolver = resolve<Records, HookContext>({
  artist: async (value, record, context) => {
    if (!record?.artist) {
      return {
        name: ''
      }
    }

    return record.artist
  },
  genres: async (value, record, context) => {
    if (!record?.genres) {
      return []
    }

    return record.genres
  }
})

// Schema for creating new entries
export const recordsDataSchema = Type.Pick(
  recordsSchema,
  ['name', 'year', 'smallImageUrl', 'largeImageUrl', 'discogsMasterId'],
  {
    $id: 'RecordsData'
  }
)
export type RecordsData = Static<typeof recordsDataSchema>
export const recordsDataValidator = getValidator(recordsDataSchema, dataValidator)
export const recordsDataResolver = resolve<Records, HookContext>({
  createdAt: async () => {
    // Return the current date
    return new Date().toISOString()
  }
})

// Schema for updating existing entries
export const recordsPatchSchema = Type.Partial(recordsSchema, {
  $id: 'RecordsPatch'
})
export type RecordsPatch = Static<typeof recordsPatchSchema>
export const recordsPatchValidator = getValidator(recordsPatchSchema, dataValidator)
export const recordsPatchResolver = resolve<Records, HookContext>({
  updatedAt: async () => {
    // Return the current date
    return new Date().toISOString()
  }
})

// Schema for allowed query properties
export const recordsQueryProperties = Type.Intersect([
  Type.Pick(recordsSchema, ['id', 'name', 'year', 'discogsMasterId', 'createdAt', 'updatedAt']),
  Type.Object({
    username: Type.String()
  })
])
export const recordsQuerySchema = Type.Intersect(
  [
    querySyntax(recordsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type RecordsQuery = Static<typeof recordsQuerySchema>
export const recordsQueryValidator = getValidator(recordsQuerySchema, queryValidator)
export const recordsQueryResolver = resolve<RecordsQuery, HookContext>({})
