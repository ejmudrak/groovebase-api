/* add-default-bins.ts
 */
import type { HookContext } from '../../../declarations'

export const addDefaultBins = async (context: HookContext) => {
  const {
    app,
    params: { skipAfterHooks },
    result
  } = context

  if (!skipAfterHooks) {
    // fetches default bins
    const defaultBins = await app.service('bins').find({ paginate: false, query: { isDefault: true } })
    const userId = result.id

    // creates instances of default bins for user
    await app
      .service('bins')
      .createQuery()
      .insert(defaultBins.map((bin) => ({ ...bin, userId, isDefault: false })))
      .onConflict()
      .ignore()
  }
}
