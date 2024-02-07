/* remove-record-bins.ts
- This hook is used to remove a record from the user's bins,
   when the record is removed from the user's collection.
*/

// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { HookContext } from '../../../declarations'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default () => {
  return async (context: HookContext): Promise<HookContext> => {
    const {
      app,
      params: { user },
      result
    } = context

    const recordIds = Array.isArray(result) ? result.map((item) => item.recordId) : [result.recordId]

    if (recordIds?.length && user.id) {
      await app
        .service('record-bins')
        .remove(null, { query: { recordId: { $in: recordIds }, userId: user.id } })
    }

    return context
  }
}
