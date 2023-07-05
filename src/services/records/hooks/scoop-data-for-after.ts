/* scoop-data-for-after.ts
 */
import type { HookContext } from '../../../declarations'

export const scoopDataForAfter = async (context: HookContext) => {
  const { data = {} } = context

  context.params.artist = data?.artist
  context.params.genres = data?.genres

  delete context.data.artist
  delete context.data.genres
}
