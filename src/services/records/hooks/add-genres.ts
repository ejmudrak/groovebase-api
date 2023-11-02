/* scoop-data-for-after.ts
 */
import type { HookContext } from '../../../declarations'

export const addGenres = async (context: HookContext) => {
  const {
    app,
    params: { genres = [], skipAfterHooks },
    result
  } = context

  if (genres.length && !skipAfterHooks) {
    // creates genres
    await app
      .service('genres')
      .createQuery()
      .insert(genres.map((genre: string) => ({ name: genre })))
      .onConflict()
      .ignore()

    // get ids of genres
    const genreIds = await app.service('genres').find({ query: { $select: ['id'], name: { $in: genres } } })

    // connects genres to record via through table
    const recordGenrePayload = genreIds.data.map(({ id }) => ({ recordId: result.id, genreId: id }))
    await app.service('record-genre').create(recordGenrePayload)
  }
}
