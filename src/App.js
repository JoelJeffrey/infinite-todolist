import { useState } from 'react'

import TodoList from './TodoList/TodoList'
import { useTodos } from './TodoProvider'
import './App.css'

function App() {
  const { todos, addTodo, deleteAllTodos } = useTodos()
  const [value, setValue] = useState('')

  return (
    <div className="App">
      <h1 className="title">Todo List</h1>
      <div className="todo-actions">
        <input
          className="add-todo-input"
          type="text"
          value={value}
          placeholder="Write A Todo!"
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          className="add-todo-button"
          onClick={() => {
            addTodo({ text: value })
            setValue('')
          }}
        >
          Add Item
        </button>
      </div>
      {todos.length > 0 && (
        <>
        <span
          className="todo-list-delete-all"
          onClick={() => {
            deleteAllTodos()
          }}
        >
          Delete All
        </span>
        <main className="todo-list-wrapper">
          <TodoList todos={todos} />
        </main>
        </>
      )}
    </div>
  )
}

export default App
