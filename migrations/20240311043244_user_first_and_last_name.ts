import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  const hasFirstName = await knex.schema.hasColumn('users', 'firstName')
  const hasLastName = await knex.schema.hasColumn('users', 'lastName')

  if (!hasFirstName && !hasLastName) {
    await knex.schema.table('users', (table) => {
      table.string('firstName')
      table.string('lastName')
    })
  }
}

export async function down(knex: Knex): Promise<void> {}
