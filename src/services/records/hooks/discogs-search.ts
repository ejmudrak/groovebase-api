import type { HookContext, NextFunction } from '../../../declarations'
import axios from 'axios'

export const discogsSearch = async (context: HookContext, next: NextFunction) => {
  const {
    params: { query: { name = '' } = {} }
  } = context

  const response = await axios({
    method: 'get',
    url: `https://api.discogs.com/database/search?q=${name}&format=album`,
    headers: {
      Authorization: 'Discogs key=lfdUKGqmFqErHvKBReNI, secret=QVrzcOhkMiwPPCfVvVbahsKfuphOFhOu'
    }
  })

  console.log('response: ', response.data)

  return next()
}
