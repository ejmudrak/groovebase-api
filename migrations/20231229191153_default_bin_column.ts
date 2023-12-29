import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  const hasIsDefault = await knex.schema.hasColumn('bins', 'isDefault')

  if (!hasIsDefault) {
    await knex.schema.table('bins', (table) => {
      table.boolean('isDefault')
    })
  }
}

export async function down(knex: Knex): Promise<void> {
  const hasIsDefault = await knex.schema.hasColumn('bins', 'isDefault')

  if (hasIsDefault) {
    await knex.schema.table('bins', (table) => {
      table.dropColumn('isDefault')
    })
  }
}
