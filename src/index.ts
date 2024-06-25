import { Elysia } from 'elysia'
import { Task, taskModel } from './tasks/task.model'

const tasks: Task[] = [
  { id: 1, title: 'Task 1', status: 'done' },
  { id: 2, title: 'Task 2', status: 'done' },
  { id: 3, title: 'Task 3', status: 'pending' },
]

const app = new Elysia()

app.get('/', () => 'Hello Elysia')
app
  .use(taskModel)
  .get(
    '/tasks',
    () => {
      /*
       *  new Response(JSON.stringify({ tasks }), {
       *    headers: { "Content-Type": "application/json" },
       *  });
       *  でreturnの値はラップされる
       */

      return {
        tasks,
      }
    },
    { response: 'task.tasks' },
  )
  .post(
    '/tasks',
    ({ body }) => {
      const newTask: Task = {
        id: tasks.length + 1,
        title: body.title,
        status: body.status,
      }

      tasks.push(newTask)

      return {
        task: newTask,
      }
    },
    { body: 'task.taskDto', response: 'task.task' },
  )

app.listen(3000)

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)
