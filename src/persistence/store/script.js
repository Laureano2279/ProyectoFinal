const { config } = require('./db_sqlite/config')
const knex = require('knex')(config)

createProduct()
createMessage()

async function createProduct() {
  try {
    await knex.schema.dropTableIfExists('products')
    console.log('products table deleted')

    await knex.schema.createTable('products', (table) => {
      table.increments('id').primary()
      table.string('name', 100).notNullable()
      table.decimal('price').notNullable()
      table.string('img', 200).notNullable()
    })

    console.log('products table created')
  } catch (error) {
    console.error(error)
  } finally {
    knex.destroy()
  }
}

async function createMessage() {
  try {
    await knex.schema.dropTableIfExists('messages')
    console.log('messages table deleted')

    await knex.schema.createTable('messages', (table) => {
      table.increments('id').primary()
      table.string('firstName', 70).notNullable()
      table.string('lastName', 100).notNullable()
      table.string('email', 100).notNullable()
      table.timestamp('date').defaultTo(knex.fn.now())
      table.string('message', 100).notNullable()
    })

    console.log('messages table created')
  } catch (error) {
    console.error(error)
  } finally {
    knex.destroy()
  }
}