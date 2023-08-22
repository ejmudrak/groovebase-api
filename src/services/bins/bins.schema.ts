// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const binsSchema = Type.Object(
  {
    id: Type.Number(),
    name: Type.String(),
    order: Type.Integer(),
    featuredRecordId: Type.Integer(),
    userId: Type.Integer(),
    createdAt: Type.String({ format: 'date-time' }),
    updatedAt: Type.String({ format: 'date-time' })
  },
  { $id: 'Bins', additionalProperties: false }
)
export type Bins = Static<typeof binsSchema>
export const binsValidator = getValidator(binsSchema, dataValidator)
export const binsResolver = resolve<Bins, HookContext>({})

export const binsExternalResolver = resolve<Bins, HookContext>({})

// Schema for creating new entries
export const binsDataSchema = Type.Pick(binsSchema, ['name', 'featuredRecordId'], {
  $id: 'BinsData'
})
export type BinsData = Static<typeof binsDataSchema>
export const binsDataValidator = getValidator(binsDataSchema, dataValidator)
export const binsDataResolver = resolve<Bins, HookContext>({})

// Schema for updating existing entries
export const binsPatchSchema = Type.Partial(binsSchema, {
  $id: 'BinsPatch'
})
export type BinsPatch = Static<typeof binsPatchSchema>
export const binsPatchValidator = getValidator(binsPatchSchema, dataValidator)
export const binsPatchResolver = resolve<Bins, HookContext>({})

// Schema for allowed query properties
export const binsQueryProperties = Type.Pick(binsSchema, ['id', 'name', 'userId', 'updatedAt', 'createdAt'])
export const binsQuerySchema = Type.Intersect(
  [
    querySyntax(binsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type BinsQuery = Static<typeof binsQuerySchema>
export const binsQueryValidator = getValidator(binsQuerySchema, queryValidator)
export const binsQueryResolver = resolve<BinsQuery, HookContext>({})
