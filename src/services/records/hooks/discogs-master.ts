/* discogs-master.ts
  Fetches record data from Discogs using a master ID, which returns more information than a search
  Docs: https://www.discogs.com/developers#page:database,header:database-master-release
*/

import type { DiscogsMasterResult, HookContext } from '../../../declarations'
import axios from 'axios'

export const getDiscogsMaster = async (context: HookContext) => {
  const {
    params: { query: { discogsMasterId = '' } = {} }
  } = context

  if (discogsMasterId) {
    const response = await axios({
      method: 'get',
      url: `https://api.discogs.com/masters/${discogsMasterId}`,
      headers: {
        Authorization: `Discogs key=${process.env.DISCOGS_KEY}, secret=${process.env.DISCOGS_SECRET}`
      }
    })

    const result: DiscogsMasterResult = response.data
    console.log('result: ', result)

    const { id, year, title, artists, genres, styles, tracklist } = result
    console.log('tracklist: ', tracklist)

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
