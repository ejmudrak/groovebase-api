/* filter-records-by-bin-id.ts
  Queries record-bins service to only include records in a bin
*/

import type { HookContext } from '../../../declarations'
import { RecordBin } from '../../record-bins/record-bins.schema'

export const filterRecordsByBinId = async (context: HookContext) => {
  const {
    app,
    params: { query: { binId = undefined } = {} }
  } = context

  if (binId) {
    const recordsInBin: any = await app.service('record-bins').find({
      paginate: false,
      query: {
        $select: ['recordId'],
        binId
      }
    })

    context.params.query.id = { $in: recordsInBin.map((rb: RecordBin) => rb.recordId) }

    delete context.params.query.binId
  }

  return context
}
