/* discogs-import-collection.ts

  Fetches all records from a user's Discogs collection, 
    then adds the records and artists to the database
*/
import type { HookContext } from '../../../declarations'
import axios from 'axios'
import { formatDiscogsRecord } from './utils/format-discogs-collection'

export const importDiscogsCollection = async (context: HookContext) => {
  const {
    params: { query: { username = '' } = {} }
  } = context

  if (username) {
    /* Fetch the records in the user's collection */
    const response = await axios({
      method: 'get',
      url: `https://api.discogs.com/users/${username}/collection/folders/0/releases?sort=added&sort_order=desc`,
      headers: {
        Authorization: `Discogs key=${process.env.DISCOGS_KEY}, secret=${process.env.DISCOGS_SECRET}`
      }
    })

    const errorMessage = response.data?.message

    if (errorMessage) {
      context.error = errorMessage
    }

    /* Format the records for adding to the database */
    context.data = formatDiscogsRecord(response.data.releases)

    // TODO: Handle adding artist and genres for each record
  }
}
