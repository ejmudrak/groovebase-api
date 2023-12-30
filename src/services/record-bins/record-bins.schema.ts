// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const recordBinsSchema = Type.Object(
  {
    id: Type.Number(),
    recordId: Type.Integer(),
    binId: Type.Integer(),
    createdAt: Type.String({ format: 'date-time' }),
    updatedAt: Type.String({ format: 'date-time' })
  },
  { $id: 'RecordBin', additionalProperties: false }
)
export type RecordBin = Static<typeof recordBinsSchema>
export const recordBinsValidator = getValidator(recordBinsSchema, dataValidator)
export const recordBinsResolver = resolve<RecordBin, HookContext>({})

export const recordBinsExternalResolver = resolve<RecordBin, HookContext>({})

// Schema for creating new entries
export const recordBinsDataSchema = Type.Pick(recordBinsSchema, ['recordId', 'binId'], {
  $id: 'RecordBinsData'
})
export type RecordBinsData = Static<typeof recordBinsDataSchema>
export const recordBinsDataValidator = getValidator(recordBinsDataSchema, dataValidator)
export const recordBinsDataResolver = resolve<RecordBin, HookContext>({})

// Schema for updating existing entries
export const recordBinsPatchSchema = Type.Partial(recordBinsSchema, {
  $id: 'RecordBinsPatch'
})
export type RecordBinsPatch = Static<typeof recordBinsPatchSchema>
export const recordBinsPatchValidator = getValidator(recordBinsPatchSchema, dataValidator)
export const recordBinsPatchResolver = resolve<RecordBin, HookContext>({})

// Schema for allowed query properties
export const recordBinsQueryProperties = Type.Pick(recordBinsSchema, ['id', 'recordId', 'binId'])
export const recordBinsQuerySchema = Type.Intersect(
  [
    querySyntax(recordBinsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type RecordBinsQuery = Static<typeof recordBinsQuerySchema>
export const recordBinsQueryValidator = getValidator(recordBinsQuerySchema, queryValidator)
export const recordBinsQueryResolver = resolve<RecordBinsQuery, HookContext>({})
