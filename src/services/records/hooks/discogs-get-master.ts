/* discogs-get-master.ts
  Fetches record data from Discogs using a master release ID, which returns more info than a search
  Docs: https://www.discogs.com/developers#page:database,header:database-master-release
*/

import type { DiscogsMasterResult, HookContext } from '../../../declarations'
import axios from 'axios'

export const getDiscogsMaster = async (context: HookContext) => {
  const {
    params: { query: { discogsMasterId = '' } = {} }
  } = context

  if (discogsMasterId.length > 0) {
    const response = await axios({
      method: 'get',
      url: `https://api.discogs.com/masters/${discogsMasterId}`,
      headers: {
        Authorization: `Discogs key=${process.env.DISCOGS_KEY}, secret=${process.env.DISCOGS_SECRET}`
      }
    })

    const result: DiscogsMasterResult = response.data
    const { id, year, title, artists, genres, styles } = result

    const data = [
      {
        name: title,
        year,
        discogsMasterId: id,
        artist: artists[0].name,
        genres: genres.concat(styles)
      }
    ]

    context.result = {
      data,
      total: 1,
      limit: 1,
      skip: 0
    }
  }
  return context
}
