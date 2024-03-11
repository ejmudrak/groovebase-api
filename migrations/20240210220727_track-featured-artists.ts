// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  const hasTable = await knex.schema.hasTable('track_featured_artists');

  if(!hasTable) {
    await knex.schema.createTable('track_featured_artists', (table) => {
      table.increments('id')

      table.string('text')
    })
  }

}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('track_featured_artists')
}
