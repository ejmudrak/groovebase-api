// For more information about this file see https://dove.feathersjs.com/guides/cli/log-error.html
import type { HookContext } from '../../../declarations'

export const ignoreExisting = async (context: HookContext) => {
  const {
    data: { discogsMasterId }
  } = context

  if (discogsMasterId) {
    const [existing] = await context.service.find({
      paginate: false,
      query: {
        $limit: 1,
        discogsMasterId: discogsMasterId
      }
    })

    if (existing) {
      context.result = existing
      context.params.skipAfterHooks = true
    }
  }
}
