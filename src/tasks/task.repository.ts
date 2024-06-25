import { Client } from 'pg'
import { Task, TaskDTO } from './task.model'

const db = new Client({
  host: 'localhost',
  user: 'bun_elysia_admin',
  password: 'bun_elysia_psql',
  database: 'bun_elysia_admin',
  port: 5555,
})

const getAllQuery = 'SELECT * FROM tasks'
const getTaskByIdQuery = 'SELECT * FROM tasks WHERE id = $1'
const insertQuery = 'INSERT INTO tasks (title, status) VALUES ($1, $2) RETURNING *'

export const TaskRepository = {
  async getAll() {
    await db.connect()
    const { rows } = await db.query(getAllQuery)

    return rows[0] as Task[]
  },

  async getById(id: number) {
    await db.connect()
    const { rows } = await db.query(getTaskByIdQuery, [id])

    return rows[0] as Task
  },

  async create(dto: TaskDTO) {
    await db.connect()
    const { rows } = await db.query(insertQuery, [dto.title, dto.status])

    return rows[0] as Task
  },
}
