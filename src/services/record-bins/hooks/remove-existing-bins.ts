/* remove-existing-bins.ts
- This hook is used to remove existing bins for a given record ID.
- When we update a user's record, we're passed the new records in the bin. 
  So, we want to remove the existing bins for that record ID and replace them with the new bins.
*/

// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { HookContext } from '../../../declarations'
import { RecordBin } from '../record-bins.schema'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default () => {
  return async (context: HookContext): Promise<HookContext> => {
    const {
      app,
      params: { user }
    } = context

    // Remove duplicate record IDs using a Set, though we'll typically have one record to many bins here
    const recordIds = Array.isArray(context.data)
      ? new Set(context.data.map((item: RecordBin) => item.recordId))
      : new Set([context.data.recordId])

    if (user.id && recordIds.size > 0) {
      await app
        .service('record-bins')
        .remove(null, { query: { recordId: { $in: [...recordIds] }, userId: user.id } })
    }

    return context
  }
}
