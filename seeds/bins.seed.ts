import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('bins').del()

  // Inserts seed entries
  await knex('bins').insert([
    { name: 'Bargain Bin Finds', order: 1, isDefault: true },
    { name: 'Colored Wax', order: 2, isDefault: true },
    { name: 'Cozy Background', order: 3, isDefault: true },
    { name: 'For Hosting', order: 4, isDefault: true },
    { name: 'Late-Night Jams', order: 5, isDefault: true },
    { name: 'Long-Term Keeps', order: 6, isDefault: true },
    { name: 'Need To Listen', order: 7, isDefault: true },
    { name: 'New', order: 8, isDefault: true },
    { name: 'Pre-orders', order: 9, isDefault: true },
    { name: 'Rare Gems', order: 10, isDefault: true },
    { name: 'Stuff To Sell', order: 11, isDefault: true },
    { name: 'Upbeat Spins', order: 12, isDefault: true },
    { name: 'Used', order: 13, isDefault: true }
  ])
}
