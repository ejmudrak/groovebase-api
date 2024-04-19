import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  const hasSourceColumn = await knex.schema.hasColumn('user_records', 'source')

  if (!hasSourceColumn) {
    await knex.schema.table('user_records', (table) => {
      table.string('source')
    })
  }
}

export async function down(knex: Knex): Promise<void> {}
