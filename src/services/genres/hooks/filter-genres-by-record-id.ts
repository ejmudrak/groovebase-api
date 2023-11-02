/* filter-genres-by-record-id.ts
  Queries record-genre service to only include genres linked to the given record
*/

import type { HookContext } from '../../../declarations'
import { RecordGenre } from '../../record-genre/record-genre.schema'

export const filterGenresByRecordId = async (context: HookContext) => {
  const {
    app,
    params: { query: { recordId = undefined } = {} }
  } = context

  if (recordId) {
    // TODO: Add base class for handling correct TS type for non-paginated data
    const recordGenres: any = await app.service('record-genre').find({
      paginate: false,
      query: {
        $select: ['genreId'],
        recordId
      }
    })

    if (recordGenres?.length > 0) {
      context.params.query.id = { $in: recordGenres.map((rg: RecordGenre) => rg.genreId) }
    }
  }

  delete context.params.query.recordId
  return context
}
