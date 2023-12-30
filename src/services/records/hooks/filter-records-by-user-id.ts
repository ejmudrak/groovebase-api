/* filter-records-by-user-id.ts
  Queries user-records service to only include records in the user's collection
*/

import type { HookContext } from '../../../declarations'
import { UserRecord } from '../../user-records/user-records.schema'

export const filterRecordsByUserId = async (context: HookContext) => {
  const {
    app,
    params: { query: { userId = undefined } = {} }
  } = context

  if (userId) {
    // TODO: Add base class for handling correct TS type for non-paginated data
    const userRecords: any = await app.service('user-records').find({
      paginate: false,
      query: {
        $select: ['recordId'],
        userId
      }
    })

    context.params.query.id = { $in: userRecords.map((rc: UserRecord) => rc.recordId) }

    delete context.params.query.userId
  }

  return context
}
