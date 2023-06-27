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
    year: Type.String(),
    imageUrl: Type.String(),
    discogsMasterId: Type.Number(),
    createdAt: Type.String({ format: 'date-time' }),
    updatedAt: Type.String({ format: 'date-time' })
  },
  { $id: 'Records', additionalProperties: false }
)
export type Records = Static<typeof recordsSchema>
export const recordsValidator = getValidator(recordsSchema, dataValidator)
export const recordsResolver = resolve<Records, HookContext>({})

export const recordsExternalResolver = resolve<Records, HookContext>({})

// Schema for creating new entries
export const recordsDataSchema = Type.Pick(recordsSchema, ['name', 'year', 'imageUrl', 'discogsMasterId'], {
  $id: 'RecordsData'
})
export type RecordsData = Static<typeof recordsDataSchema>
export const recordsDataValidator = getValidator(recordsDataSchema, dataValidator)
export const recordsDataResolver = resolve<Records, HookContext>({})

// Schema for updating existing entries
export const recordsPatchSchema = Type.Partial(recordsSchema, {
  $id: 'RecordsPatch'
})
export type RecordsPatch = Static<typeof recordsPatchSchema>
export const recordsPatchValidator = getValidator(recordsPatchSchema, dataValidator)
export const recordsPatchResolver = resolve<Records, HookContext>({})

// Schema for allowed query properties
export const recordsQueryProperties = Type.Pick(recordsSchema, [
  'id',
  'name',
  'year',
  'imageUrl',
  'discogsMasterId'
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
