import type { NextApiRequest, NextApiResponse } from 'next'
import { sequelize } from '../../../../../lib/db'
import { Todo } from '../../../../../models/Todo'
import { Comment } from '../../../../../models/Comment'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const todoId = Array.isArray(req.query.id) ? parseInt(req.query.id[0], 10) : parseInt(req.query.id as string, 10)
  const todo = await Todo.findByPk(todoId)
  if (!todo) return res.status(404).end()

  if (req.method === 'GET') {
    const comments = await Comment.findAll({ where: { todoId } })
    return res.status(200).json(comments)
  }

  if (req.method === 'POST') {
    const { text } = req.body
    if (!text || !text.trim()) return res.status(400).json({ error: 'Text required' })
    const comment = await Comment.create({ text, todoId })
    return res.status(201).json(comment)
  }

  return res.status(405).end()
}
