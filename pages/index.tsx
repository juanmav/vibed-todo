import { useEffect, useState } from 'react'

interface Todo {
  id: number
  title: string
  completed: boolean
}

interface Comment {
  id: number
  text: string
  todoId: number
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [title, setTitle] = useState('')
  const [comments, setComments] = useState<Record<number, Comment[]>>({})
  const [showComments, setShowComments] = useState<Record<number, boolean>>({})
  const [newComment, setNewComment] = useState<Record<number, string>>({})

  const fetchTodos = async () => {
    const res = await fetch('/api/todos')
    const data = await res.json()
    setTodos(data)
  }

  const addTodo = async () => {
    if (!title.trim()) return
    await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    })
    setTitle('')
    fetchTodos()
  }

  const toggleTodo = async (id: number) => {
    await fetch(`/api/todos/${id}`, { method: 'PUT' })
    fetchTodos()
  }

  const deleteTodo = async (id: number) => {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' })
    fetchTodos()
  }

  const fetchComments = async (todoId: number) => {
    const res = await fetch(`/api/todos/${todoId}/comments`)
    const data = await res.json()
    setComments(prev => ({ ...prev, [todoId]: data }))
  }

  const addComment = async (todoId: number) => {
    const text = newComment[todoId]
    if (!text || !text.trim()) return
    await fetch(`/api/todos/${todoId}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    })
    setNewComment(prev => ({ ...prev, [todoId]: '' }))
    fetchComments(todoId)
  }

  const toggleCommentsSection = (todoId: number) => {
    setShowComments(prev => {
      const open = !prev[todoId]
      if (open && !comments[todoId]) fetchComments(todoId)
      return { ...prev, [todoId]: open }
    })
  }

  useEffect(() => { fetchTodos() }, [])

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Todo List</h1>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="New todo" />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
            {todo.title}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            <button onClick={() => toggleCommentsSection(todo.id)} style={{ marginLeft: '0.5rem' }}>
              {showComments[todo.id] ? 'Hide Comments' : 'Show Comments'}
            </button>
            {showComments[todo.id] && (
              <div style={{ marginLeft: '1rem' }}>
                <ul>
                  {comments[todo.id]?.map(comment => (
                    <li key={comment.id}>{comment.text}</li>
                  ))}
                </ul>
                <input
                  value={newComment[todo.id] || ''}
                  onChange={e => setNewComment(prev => ({ ...prev, [todo.id]: e.target.value }))}
                  placeholder="New comment"
                />
                <button onClick={() => addComment(todo.id)}>+</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
