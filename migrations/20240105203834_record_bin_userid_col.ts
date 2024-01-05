import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  const hasUserId = await knex.schema.hasColumn('record_bins', 'userId')

  if (!hasUserId) {
    await knex.schema.table('record_bins', (table) => {
      table.integer('userId')
      table.foreign('userId').references('id').inTable('users')
    })
  }
}

export async function down(knex: Knex): Promise<void> {
  const hasUserId = await knex.schema.hasColumn('record_bins', 'userId')

  if (hasUserId) {
    await knex.schema.table('record_bins', (table) => {
      table.dropColumn('userId')
    })
  }
}
