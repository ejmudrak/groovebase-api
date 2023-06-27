import type { HookContext, NextFunction } from '../../../declarations'
import { logger } from '../../../logger'

export const discogsSearch = async (context: HookContext, next: NextFunction) => {
  const {
    params: { query: { name = '' } = {} }
  } = context

  const results = await fetch(`https://api.discogs.com/database/search?q=${name}&format=album`, {
    headers: {
      Authorization: 'Discogs key=lfdUKGqmFqErHvKBReNI, secret=QVrzcOhkMiwPPCfVvVbahsKfuphOFhOu'
    }
  })
  console.log('results: ', results)

  return context
}
