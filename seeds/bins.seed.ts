import { Knex } from 'knex'

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('bins').del()

  // Inserts seed entries
  await knex('bins').insert([
    { name: 'Bargain Bin Finds', order: 1 },
    { name: 'Colored Wax', order: 2 },
    { name: 'Cozy Background', order: 3 },
    { name: 'For Hosting', order: 4 },
    { name: 'Late-Night Jams', order: 5 },
    { name: 'Long-Term Keeps', order: 6 },
    { name: 'Need To Listen', order: 7 },
    { name: 'New', order: 8 },
    { name: 'Pre-orders', order: 9 },
    { name: 'Rare Gems', order: 10 },
    { name: 'Stuff To Sell', order: 11 },
    { name: 'Upbeat Spins', order: 12 },
    { name: 'Used', order: 13 }
  ])
}
