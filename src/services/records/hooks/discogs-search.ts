import type { HookContext, NextFunction } from '../../../declarations'
import axios from 'axios'

type DiscogsSearchResult = {
  title: string
  year: string
  style: string[]
  genre: string[]
  thumb: string
  cover_image: string
  master_id: number
}

export const discogsSearch = async (context: HookContext, next: NextFunction) => {
  const {
    params: { query: { name = '' } = {} }
  } = context

  const response = await axios({
    method: 'get',
    url: `https://api.discogs.com/database/search?q=${name}&format=album&type=master`,
    headers: {
      Authorization: `Discogs key=${process.env.DISCOGS_KEY}, secret=${process.env.DISCOGS_SECRET}`
    }
  })

  const results: DiscogsSearchResult[] = response.data.results

  const result = results.map(({ title, year, thumb, cover_image: coverImage, master_id: masterId }) => {
    const [_, album] = title.split(' - ')

    return {
      name: album,
      year,
      smallImageUrl: thumb,
      largeImageUrl: coverImage,
      discogsMasterId: masterId
    }
  })

  context.result = result

  return next()
}
