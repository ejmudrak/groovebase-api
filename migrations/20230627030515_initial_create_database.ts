import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('records', (table) => {
    table.increments('id')
    table.string('name')
    table.integer('year')
    table.string('artist')
    table.string('smallImageUrl')
    table.string('largeImageUrl')
    table.integer('discogsMasterId')

    table.timestamp('createdAt').defaultTo(knex.fn.now())
    table.timestamp('updatedAt').defaultTo(knex.fn.now())
  })

  await knex.schema.createTable('genres', (table) => {
    table.increments('id')
    table.string('name')

    table.timestamp('createdAt').defaultTo(knex.fn.now())
    table.timestamp('updatedAt').defaultTo(knex.fn.now())
  })

  await knex.schema.createTable('record_genres', (table) => {
    table.increments('id')

    table.integer('recordId')
    table.foreign('recordId').references('id').inTable('records')

    table.integer('genreId')
    table.foreign('genreId').references('id').inTable('genres')

    table.unique(['recordId', 'genreId'])

    table.timestamp('createdAt').defaultTo(knex.fn.now())
    table.timestamp('updatedAt').defaultTo(knex.fn.now())
  })

  await knex.schema.createTable('tracks', (table) => {
    table.increments('id')
    table.string('name')
    table.string('duration')
    table.string('position')

    table.integer('recordId')
    table.foreign('recordId').references('id').inTable('records')

    table.unique(['position', 'recordId'])

    table.timestamp('createdAt').defaultTo(knex.fn.now())
    table.timestamp('updatedAt').defaultTo(knex.fn.now())
  })

  await knex.schema.createTable('track_featured_artists', (table) => {
    table.increments('id')

    table.integer('trackId')
    table.foreign('trackId').references('id').inTable('tracks')

    table.string('artist')

    table.unique(['trackId', 'artist'])

    table.timestamp('createdAt').defaultTo(knex.fn.now())
    table.timestamp('updatedAt').defaultTo(knex.fn.now())
  })

  await knex.schema.createTable('bins', (table) => {
    table.increments('id')
    table.string('name')
    table.integer('order')

    table.integer('featuredRecordId')
    table.foreign('featuredRecordId').references('id').inTable('records')

    table.integer('userId')
    table.foreign('userId').references('id').inTable('users')

    table.unique(['order', 'userId'])

    table.timestamp('createdAt').defaultTo(knex.fn.now())
    table.timestamp('updatedAt').defaultTo(knex.fn.now())
  })

  await knex.schema.createTable('record_bins', (table) => {
    table.increments('id')

    table.integer('recordId')
    table.foreign('recordId').references('id').inTable('records')

    table.integer('binId')
    table.foreign('binId').references('id').inTable('bins')

    table.unique(['recordId', 'binId'])

    table.timestamp('createdAt').defaultTo(knex.fn.now())
    table.timestamp('updatedAt').defaultTo(knex.fn.now())
  })

  await knex.schema.createTable('sellers', (table) => {
    table.increments('id')
    table.string('name')

    table.timestamp('createdAt').defaultTo(knex.fn.now())
    table.timestamp('updatedAt').defaultTo(knex.fn.now())
  })

  await knex.schema.createTable('user_records', (table) => {
    table.increments('id')

    table.integer('recordId')
    table.foreign('recordId').references('id').inTable('records')

    table.integer('userId')
    table.foreign('userId').references('id').inTable('users')

    table.unique(['recordId', 'userId'])

    table.string('action').nullable()
    table.string('notes').nullable()
    table.string('mediaCondition')
    table.string('sleeveCondition').nullable()
    table.string('color').nullable()
    table.decimal('price').nullable()
    table.integer('sellerId').nullable()
    table.foreign('sellerId').references('id').inTable('sellers')

    table.timestamp('createdAt').defaultTo(knex.fn.now())
    table.timestamp('updatedAt').defaultTo(knex.fn.now())
  })

  await knex.schema.createTable('activity_types', (table) => {
    table.increments('id')
    table.string('name')

    table.timestamp('createdAt').defaultTo(knex.fn.now())
    table.timestamp('updatedAt').defaultTo(knex.fn.now())
  })

  await knex.schema.createTable('activity_verbs', (table) => {
    table.increments('id')
    table.string('name')

    table.integer('activityTypeId')
    table.foreign('activityTypeId').references('id').inTable('activity_types')

    table.timestamp('createdAt').defaultTo(knex.fn.now())
    table.timestamp('updatedAt').defaultTo(knex.fn.now())
  })

  await knex.schema.createTable('activity', (table) => {
    table.increments('id')
    table.string('caption')
    table.jsonb('meta')

    table.integer('activityTypeId')
    table.foreign('activityTypeId').references('id').inTable('activity_types')

    table.integer('activityVerbId')
    table.foreign('activityVerbId').references('id').inTable('activity_verbs')

    table.integer('recordId')
    table.foreign('recordId').references('id').inTable('records')

    table.integer('userId')
    table.foreign('userId').references('id').inTable('users')

    table.integer('binId').nullable()
    table.foreign('binId').references('id').inTable('bins')

    table.timestamp('createdAt').defaultTo(knex.fn.now())
    table.timestamp('updatedAt').defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {}
