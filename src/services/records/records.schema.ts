// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import { Tracks, tracksSchema } from '../tracks/tracks.schema'

// Main data model schema
export const recordsSchema = Type.Object(
  {
    id: Type.Number(),
    name: Type.String(),
    year: Type.Number(),
    artist: Type.String(),
    smallImageUrl: Type.String(),
    largeImageUrl: Type.String(),
    discogsMasterId: Type.Number(),
    genres: Type.Array(Type.String()),
    tracks: Type.Array(Type.Ref(tracksSchema)),
    createdAt: Type.String({ format: 'date-time' }),
    updatedAt: Type.String({ format: 'date-time' })
  },
  { $id: 'Record', additionalProperties: false }
)
export type Record = Static<typeof recordsSchema>
export const recordsValidator = getValidator(recordsSchema, dataValidator)
export const recordsResolver = resolve<Record, HookContext>({})

export const recordsExternalResolver = resolve<Record, HookContext>({
  genres: virtual(async (record, context) => {
    // handles populating genres for records that exist in the db
    if (record.id) {
      const genres = await context.app
        .service('genres')
        .find({ query: { $select: ['name'], recordId: record.id } })

      return genres.data.map((genre) => genre.name)
    }

    // discogs search results will already have genres
    return record.genres || []
  }),
  tracks: virtual(async (record, context) => {
    if (record.id) {
      const tracks = await context.app
        .service('tracks')
        .find({ paginate: false, query: { recordId: record.id, $sort: { position: 1 } } })

      // cleans up position by formatting as a float if necessary
      const recordSides = ['A', 'B', 'C', 'D', 'E', 'F', 'G'] as const

      const getFloatPosition = (track: Tracks) => {
        const hasSides = recordSides.some((side) => track.position?.includes(side))

        return hasSides ? track.position : parseFloat(track.position)
      }

      const t = tracks
        .map((track) => ({ ...track, position: getFloatPosition(track) }))
        .sort((a, b) => {
          const positionA = a.position
          const positionB = b.position
          if (positionA < positionB) {
            return -1
          }
          if (positionA > positionB) {
            return 1
          }

          // positions must be equal
          return 0
        })

      return t
    }
  })
})

// Schema for creating new entries
export const recordsDataSchema = Type.Pick(
  recordsSchema,
  ['name', 'year', 'artist', 'smallImageUrl', 'largeImageUrl', 'discogsMasterId'],
  {
    $id: 'RecordsData'
  }
)
export type RecordsData = Static<typeof recordsDataSchema>
export const recordsDataValidator = getValidator(recordsDataSchema, dataValidator)
export const recordsDataResolver = resolve<Record, HookContext>({
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
export const recordsPatchResolver = resolve<Record, HookContext>({
  updatedAt: async () => {
    // Return the current date
    return new Date().toISOString()
  }
})

// Schema for allowed query properties
//TODO: Add ilike to properties: https://feathersjs.com/api/databases/knex#querying
export const recordsQueryProperties = Type.Intersect([
  Type.Pick(recordsSchema, ['id', 'name', 'artist', 'year', 'discogsMasterId', 'createdAt', 'updatedAt']),
  Type.Object({
    username: Type.String(),
    userId: Type.Integer(),
    binId: Type.Integer()
  })
])
export const recordsQuerySchema = Type.Intersect(
  [
    querySyntax(recordsQueryProperties, {
      name: {
        $ilike: Type.String()
      },
      artist: {
        $ilike: Type.String()
      }
    }),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type RecordsQuery = Static<typeof recordsQuerySchema>
export const recordsQueryValidator = getValidator(recordsQuerySchema, queryValidator)
export const recordsQueryResolver = resolve<RecordsQuery, HookContext>({})
