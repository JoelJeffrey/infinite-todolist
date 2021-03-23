import React from 'react'

import Todo from './Todo'
import './todoList.css'

const TodoList = ({ todos }) => {
  return (
    <ul className="todo-list">
      {todos.map((todo, i) => (
        <Todo key={i} {...todo} />
      ))}
    </ul>
  )
}

export default TodoList
