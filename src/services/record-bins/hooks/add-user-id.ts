/* add-user-id.ts
- Adds user ID to payload
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

    if (user.id) {
      const dataWithUserIds = Array.isArray(context.data)
        ? context.data.map((item: RecordBin) => ({ ...item, userId: user.id }))
        : { ...context.data, userId: user.id }

      context.data = dataWithUserIds
    }

    return context
  }
}
