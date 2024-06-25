import { Elysia, t } from 'elysia'
import { Static } from '@sinclair/typebox'

const status = t.Union([t.Literal('done'), t.Literal('pending'), t.Literal('in-progress')])

const task = t.Object({
  id: t.Number(),
  title: t.String(),
  status,
})
const taskDTO = t.Object({
  title: t.String(),
  status,
})

// Staticは型スキーマからTypeScriptの型を生成する
export type Task = Static<typeof task>
export type TaskDTO = Static<typeof taskDTO>

const app = new Elysia()
export const taskModel = app.model({
  'task.task': t.Object({ task }),
  'task.tasks': t.Object({ tasks: t.Array(task)}),
  'task.taskDto': taskDTO,
})
