/* discogs-search.ts
  Fetches record data from Discogs, for the purpose of adding a record to a collection
*/

import type { DiscogsSearchResult, HookContext } from '../../../declarations'
import axios from 'axios'

export const searchDiscogs = async (context: HookContext) => {
  const {
    params: { query: { name = '', userId = '' } = {} }
  } = context

  if (name && !userId) {
    const response = await axios({
      method: 'get',
      url: `https://api.discogs.com/database/search?q=${name}&format=album&type=master`,
      headers: {
        Authorization: `Discogs key=${process.env.DISCOGS_KEY}, secret=${process.env.DISCOGS_SECRET}`
      }
    })

    const results: DiscogsSearchResult[] = response.data.results

    const data = results.map(
      ({ title, year, thumb, cover_image: coverImage, master_id: masterId, genre, style, ...rest }) => {
        const [artist, album] = title.split(' - ')

        return {
          name: album,
          year,
          smallImageUrl: thumb,
          largeImageUrl: coverImage,
          discogsMasterId: masterId,
          artist,
          genres: [...genre, ...style]
        }
      }
    )

    context.result = {
      data,
      total: data.length,
      limit: data.length,
      skip: 0
    }
  }
  return context
}
