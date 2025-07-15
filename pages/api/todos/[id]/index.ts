import type { NextApiRequest, NextApiResponse } from 'next'
import { sequelize } from '../../../../lib/db'
import { Todo } from '../../../../models/Todo'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await sequelize.sync()
  const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id
  const todo = await Todo.findByPk(id)
  if (!todo) return res.status(404).end()

  if (req.method === 'PUT') {
    todo.completed = !todo.completed
    await todo.save()
    return res.status(200).json(todo)
  }

  if (req.method === 'DELETE') {
    await todo.destroy()
    return res.status(204).end()
  }

  return res.status(405).end()
}
