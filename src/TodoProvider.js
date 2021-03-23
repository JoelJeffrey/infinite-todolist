import React, { createContext, useState, useContext, useEffect } from 'react'
import { v4 } from 'uuid'
import { arrayToTree } from 'performant-array-to-tree'

/*
  Concept for how I want to structure a todo item
  [
    todo: {
      id: v4(), // uuid lib
      text: string,
      completed: boolean,
      parentId: string
      children: todo[],
    }
  ]
*/

function newTodo({ text = '', parentId = '' }) {
  return {
    id: v4(),
    text,
    completed: false,
    parentId,
    children: [],
  }
}

function flat(todos) {
  let flattenedTodos = []

  todos.forEach((todo) => {
    flattenedTodos.push(todo)
    if (todo.children.length > 0) {
      flattenedTodos = flattenedTodos.concat(flat(todo.children))
    }
  })

  return flattenedTodos
}

// Pull Todo List data from local storage
const initialTodoList = JSON.parse(localStorage.getItem('todoItems')) ?? []

const TodosContext = createContext()
export const useTodos = () => useContext(TodosContext)

const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState(initialTodoList)

  useEffect(() => {
    // save data to local storage when it changes
    localStorage.setItem('todoItems', JSON.stringify(todos))
  }, [todos])

  const editTodo = (id, text) => {
    // Flatten Array
    let newTodos = flat([...todos])
    const todoIndex = newTodos.findIndex((stateTodo) => stateTodo.id === id)

    // update todo text
    newTodos[todoIndex].text = text
    // unflatten array
    newTodos = arrayToTree(newTodos, { dataField: null })

    setTodos(newTodos)
  }

  const addTodo = ({ id, text }) => {
    let newTodos = [...todos]

    if (id) {
      // flatten array
      newTodos = flat(newTodos)
      // push new todos
      newTodos.push(newTodo({ text, parentId: id }))
      // unflatten array
      newTodos = arrayToTree(newTodos, { dataField: null })
    } else {
      newTodos.push(newTodo({ text }))
    }

    setTodos(newTodos)
  }

  const completeAllChildren = (todos) => {
    todos.forEach(todo => {
      todo.completed = true
      if (todo.children.length > 0) {
        completeAllChildren(todo.children)
      }
    })

    return todos
  }

  const setStatusTodo = (id, status) => {
    // Flatten Array
    let newTodos = flat([...todos])
    const todoIndex = newTodos.findIndex((stateTodo) => stateTodo.id === id)
    console.log(todoIndex)
    const matchingTodo = newTodos[todoIndex]

    matchingTodo.completed = status
    if (matchingTodo.children.length > 0 && status === true) {
      completeAllChildren(matchingTodo.children)
    }
    
    // Unflatten array
    newTodos = arrayToTree(newTodos, { dataField: null })
      
    setTodos(newTodos)
  }

  const deleteTodo = (id) => {
    // Flatten Array
    let newTodos = flat([...todos])
    const todoIndex = newTodos.findIndex((stateTodo) => stateTodo.id === id)

    // delete todo based on index
    newTodos.splice(todoIndex, 1)
    // unflatten array
    newTodos = arrayToTree(newTodos, { dataField: null })

    setTodos(newTodos)
  }

  const deleteAllTodos = () => {
    setTodos([])
  }

  return (
    <TodosContext.Provider
      value={{
        todos,
        editTodo,
        addTodo,
        setStatusTodo,
        deleteTodo,
        deleteAllTodos,
      }}
    >
      {children}
    </TodosContext.Provider>
  )
}

export default TodoProvider
