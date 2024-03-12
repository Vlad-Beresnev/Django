import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons' // Import the icon

const TodoForm = ({ addTodo, name, desc, handleTodoChange}) => {
  return (
    <form onSubmit={addTodo}>
      <div>
        name:<input id="name" value={name} onChange={handleTodoChange} />
      </div>
      <div>
        description:<input id="desc" value={desc} onChange={handleTodoChange} />
      </div>
      <div>
        <button type="submit">addTodo</button>
      </div>
    </form>
  )
}

const App = () => {

  const [todos, setTodos] = useState([])
  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')

  const [showForm, setShowForm] = useState(false)

  const handleIconClick = () => {
    setShowForm(!showForm)
    if (!showForm) {
      setTimeout(() => {
        window.scrollTo( {top: document.body.scrollHeight, behavior: 'smooth'})
      }, 0)
    }
  }

  useEffect(() => {
    axios.get('http://localhost:8000/todo/todos')
      .then(response => {
        console.log(response.data)
        setTodos(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const handleTodoChange = (event) => {
    if (event.target.id === 'name') {
      setName(event.target.value)
    } else {
      setDesc(event.target.value)
    }
  }

  const create = newTask => {
    const request = axios.post('http://localhost:8000/todo/todos/', newTask)
    return request.then(response => response.data)
  }

  const addTodo = (event) => {
    event.preventDefault()
    const newTask = {
      title: name,
      description: desc,
      completed: false
    }

    create(newTask)
    .then(returnedTask => {
      console.log(returnedTask)
      setTodos(todos.concat(returnedTask))
      setName('')
      setDesc('')
    })
  }

  

  return (
    <div className="tasks-container">
      <div className="header">
        <div>
        <h1>Todo</h1>
        </div>
        <div>
        <FontAwesomeIcon size='2x' className="plus-icon" icon={faPlus} onClick={handleIconClick} href='#buttom' />
        </div>
      </div>
      {todos.map(todo => (
        <div key={todo.id} className="task-container">
          <h3>{todo.title}</h3>
          <p>{todo.description}</p>
          {todo.completed ? <p>Completed</p> : <p>Not Completed</p>}
        </div>
      ))}
        { showForm && <TodoForm addTodo={addTodo} name={name} desc={desc} handleTodoChange={handleTodoChange} />}
    </div>
  );
}

export default App;
