import { DiscogsCollectionResult } from '../../../../declarations'

export const formatDiscogsRecord = (records: DiscogsCollectionResult[]) => {
  return records.map(
    ({
      basic_information: {
        title,
        year,
        thumb,
        cover_image: coverImage,
        master_id: masterId,
        artists,
        genres,
        styles
      }
    }) => {
      const artist = { name: artists[0].name }

      return {
        name: title,
        year,
        smallImageUrl: thumb,
        largeImageUrl: coverImage,
        discogsMasterId: masterId,
        artist,
        genres: [...genres, ...styles]
      }
    }
  )
}
