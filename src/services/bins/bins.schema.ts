// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import { recordsSchema } from '../records/records.schema'

// Main data model schema
export const binsSchema = Type.Object(
  {
    id: Type.Number(),
    name: Type.String(),
    order: Type.Integer(),
    featuredRecordId: Type.Integer(),
    userId: Type.Integer(),
    isDefault: Type.Boolean(),
    numRecords: Type.Integer(),
    recentlyAddedRecords: Type.Array(Type.Object({})),
    featuredRecord: Type.Object({}),
    createdAt: Type.String({ format: 'date-time' }),
    updatedAt: Type.String({ format: 'date-time' })
  },
  { $id: 'Bins', additionalProperties: false }
)
export type Bin = Static<typeof binsSchema>
export const binsValidator = getValidator(binsSchema, dataValidator)
export const binsResolver = resolve<Bin, HookContext>({})

export const binsExternalResolver = resolve<Bin, HookContext>({
  numRecords: async (_, bin, context) => {
    const recordsInBin = await context.app
      .service('record-bins')
      .find({ query: { $limit: 1, binId: bin.id } })

    return recordsInBin.total
  },
  recentlyAddedRecords: async (_, bin, context) => {
    const recordsInBin = await context.app
      .service('records')
      .find({ query: { binId: bin.id, $limit: 5, $sort: { createdAt: -1 } }, paginate: false })

    return recordsInBin
  },
  featuredRecord: async (_, bin, context) => {
    if (bin.featuredRecordId) {
      return await context.app.service('records').get(bin.featuredRecordId)
    }
  }
})

// Schema for creating new entries
export const binsDataSchema = Type.Pick(binsSchema, ['name', 'featuredRecordId'], {
  $id: 'BinsData'
})
export type BinsData = Static<typeof binsDataSchema>
export const binsDataValidator = getValidator(binsDataSchema, dataValidator)
export const binsDataResolver = resolve<Bin, HookContext>({})

// Schema for updating existing entries
export const binsPatchSchema = Type.Partial(binsSchema, {
  $id: 'BinsPatch'
})
export type BinsPatch = Static<typeof binsPatchSchema>
export const binsPatchValidator = getValidator(binsPatchSchema, dataValidator)
export const binsPatchResolver = resolve<Bin, HookContext>({})

// Schema for allowed query properties
export const binsQueryProperties = Type.Pick(binsSchema, [
  'id',
  'name',
  'userId',
  'isDefault',
  'updatedAt',
  'createdAt'
])
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
