// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const userRecordsSchema = Type.Object(
  {
    id: Type.Number(),
    recordId: Type.Number(),
    userId: Type.Number(),

    action: Type.String(),
    notes: Type.String(),
    mediaCondition: Type.String(),
    sleeveCondition: Type.String(),
    color: Type.String(),
    price: Type.Optional(Type.Number()),
    sellerId: Type.Number(),
    source: Type.String(),

    record: Type.Any(),
    user: Type.Any(),
    bins: Type.Array(Type.Any()),
    createdAt: Type.String({ format: 'date-time' }),
    updatedAt: Type.String({ format: 'date-time' })
  },
  { $id: 'UserRecords', additionalProperties: false }
)
export type UserRecord = Static<typeof userRecordsSchema>
export const userRecordsValidator = getValidator(userRecordsSchema, dataValidator)
export const userRecordsResolver = resolve<UserRecord, HookContext>({})

export const userRecordsExternalResolver = resolve<UserRecord, HookContext>({
  record: async (value, userRecord, context) => {
    if (!userRecord?.record) {
      return {
        name: ''
      }
    }

    return userRecord.record
  },
  user: async (value, userRecord, context) => {
    if (!userRecord?.user) {
      return []
    }

    return userRecord.user
  },
  bins: async (value, userRecord, context) => {
    const recordsInBin = await context.app
      .service('record-bins')
      .find({ paginate: false, query: { recordId: userRecord.recordId } })

    const binIds = recordsInBin.map((record) => record.binId)

    const bins = await context.app
      .service('bins')
      .find({ paginate: false, query: { $select: ['id', 'name'], id: { $in: binIds } } })

    return bins
  }
})

// Schema for creating new entries
export const userRecordsDataSchema = Type.Pick(
  userRecordsSchema,
  ['recordId', 'userId', 'action', 'notes', 'mediaCondition', 'color', 'price', 'source'],
  {
    $id: 'UserRecordsData'
  }
)
export type UserRecordsData = Static<typeof userRecordsDataSchema>
export const userRecordsDataValidator = getValidator(userRecordsDataSchema, dataValidator)
export const userRecordsDataResolver = resolve<UserRecord, HookContext>({
  createdAt: async () => {
    // Return the current date
    return new Date().toISOString()
  }
})

// Schema for updating existing entries
export const userRecordsPatchSchema = Type.Partial(userRecordsSchema, {
  $id: 'UserRecordsPatch'
})
export type UserRecordsPatch = Static<typeof userRecordsPatchSchema>
export const userRecordsPatchValidator = getValidator(userRecordsPatchSchema, dataValidator)
export const userRecordsPatchResolver = resolve<UserRecord, HookContext>({
  updatedAt: async () => {
    // Return the current date
    return new Date().toISOString()
  }
})

// Schema for allowed query properties
export const userRecordsQueryProperties = Type.Intersect([
  Type.Pick(userRecordsSchema, [
    'id',
    'recordId',
    'userId',
    'action',
    'notes',
    'mediaCondition',
    'sleeveCondition',
    'color',
    'price',
    'source',
    'sellerId',
    'createdAt',
    'updatedAt'
  ]),
  Type.Object({
    username: Type.String()
  })
])
export const userRecordsQuerySchema = Type.Intersect(
  [
    querySyntax(userRecordsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type UserRecordsQuery = Static<typeof userRecordsQuerySchema>
export const userRecordsQueryValidator = getValidator(userRecordsQuerySchema, queryValidator)
export const userRecordsQueryResolver = resolve<UserRecordsQuery, HookContext>({})
