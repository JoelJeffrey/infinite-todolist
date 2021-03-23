import React from 'react'

import { useTodos } from '../TodoProvider'
import './todo.css'
import TodoList from './TodoList'

const Todo = ({ id, text, completed, children }) => {
  const { setStatusTodo, editTodo, addTodo, deleteTodo } = useTodos()

  const checkTodo = (e) => setStatusTodo(id, e.target.checked)

  const onChange = (e) => {
    editTodo(id, e.target.value)
  }

  return (
    <>
      <li className="todo-list-item">
        <input
          className="todo-item-action"
          type="checkbox"
          checked={completed}
          onChange={checkTodo}
        />
        <input
          className={`todo-list-input ${completed ? 'todo-done' : ''}`}
          type="text"
          value={text}
          placeholder="Write Todo Here"
          onChange={(e) => onChange(e)}
          required
        />
        <span className="todo-item-action" onClick={(e) => addTodo({ id: id })}>
          Add
        </span>
        <span className="todo-item-action" onClick={(e) => deleteTodo(id)}>
          Delete
        </span>
      </li>
      {children?.length > 0 && <TodoList todos={children} />}
    </>
  )
}

export default Todo
