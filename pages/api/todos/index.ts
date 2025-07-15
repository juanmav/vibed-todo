import type { NextApiRequest, NextApiResponse } from 'next'
import { sequelize } from '../../../lib/db'
import { Todo } from '../../../models/Todo'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await sequelize.sync()

  if (req.method === 'GET') {
    const todos = await Todo.findAll()
    return res.status(200).json(todos)
  }

  if (req.method === 'POST') {
    const { title } = req.body
    const todo = await Todo.create({ title })
    return res.status(201).json(todo)
  }

  return res.status(405).end()
}
