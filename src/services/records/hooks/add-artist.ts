/* add-artist.ts
  Upserts artist record, adds link between record and artist
 */
import type { HookContext } from '../../../declarations'

export const addArtist = async (context: HookContext) => {
  const {
    params: { artist }
  } = context

  if (artist) {
    // Upsert artist record
  }
}
