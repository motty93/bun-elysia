import { Client } from 'pg'

const client = new Client({
  host: 'localhost',
  user: 'bun_elysia_admin',
  password: 'bun_elysia_psql',
  database: 'bun_elysia_admin',
  port: 5555,
})

async function createTables() {
  try {
    await client.connect()
    console.log('Connected to the database')

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        status TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    await client.query(createTableQuery)
    console.log('Created the tasks table')
  } catch (err) {
    console.error('Failed to connect to the database:', err)
  } finally {
    await client.end()
  }
}

createTables()
