// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'

// Main data model schema
export const genresSchema = Type.Object(
  {
    id: Type.Number(),
    name: Type.String(),
    recordId: Type.Number(),
    createdAt: Type.String({ format: 'date-time' }),
    updatedAt: Type.String({ format: 'date-time' })
  },
  { $id: 'Genres', additionalProperties: false }
)
export type Genres = Static<typeof genresSchema>
export const genresValidator = getValidator(genresSchema, dataValidator)
export const genresResolver = resolve<Genres, HookContext>({})

export const genresExternalResolver = resolve<Genres, HookContext>({})

// Schema for creating new entries
export const genresDataSchema = Type.Pick(genresSchema, ['name'], {
  $id: 'GenresData'
})
export type GenresData = Static<typeof genresDataSchema>
export const genresDataValidator = getValidator(genresDataSchema, dataValidator)
export const genresDataResolver = resolve<Genres, HookContext>({})

// Schema for updating existing entries
export const genresPatchSchema = Type.Partial(genresSchema, {
  $id: 'GenresPatch'
})
export type GenresPatch = Static<typeof genresPatchSchema>
export const genresPatchValidator = getValidator(genresPatchSchema, dataValidator)
export const genresPatchResolver = resolve<Genres, HookContext>({})

// Schema for allowed query properties
export const genresQueryProperties = Type.Pick(genresSchema, ['id', 'name', 'recordId'])
export const genresQuerySchema = Type.Intersect(
  [
    querySyntax(genresQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type GenresQuery = Static<typeof genresQuerySchema>
export const genresQueryValidator = getValidator(genresQuerySchema, queryValidator)
export const genresQueryResolver = resolve<GenresQuery, HookContext>({})
