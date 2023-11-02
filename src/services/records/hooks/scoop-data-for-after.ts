/* scoop-data-for-after.ts
 */
import type { HookContext } from '../../../declarations'

export const scoopDataForAfter = async (context: HookContext) => {
  const { data = {} } = context

  context.params.genres = data?.genres

  delete context.data.genres
}
