import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import './App.css'

function App() {
  const [editIndex, setEditIndex] = useState(null)
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])


  // ✅ Load todos from localStorage jab component mount ho
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("myTodos"))
    if (savedTodos) {
      setTodos(savedTodos)
      console.log(savedTodos)
    }
  }, [])

  // ✅ Jab todos update ho to localStorage me save karo
  useEffect(() => {
    localStorage.setItem("myTodos", JSON.stringify(todos))
  }, [todos])

  

  const HeadingAdd = () => {
    if (todo.trim() === "") return
    setTodos([...todos, { todo, isCompleted: false }])  // default: not completed
    setTodo("")
    // saveToLS()
  }

  const HeadingEdit = (index) => {
    setEditIndex(index)
    setTodo(todos[index].todo)
    // saveToLS()
  }

  const HeadingDelete = (index) => {
    // Future implementation
    const newtodos = todos.filter((_, i) => i !== index)
    setTodos(newtodos)
    // saveToLS()
  }

  const HeadingChange = (e) => {
    setTodo(e.target.value)
  }

  const HeadingUpdate = () => {
  const updatedTodos = [...todos]
  updatedTodos[editIndex].todo = todo
  setTodos(updatedTodos)
  setEditIndex(null)  // Edit mode band
  setTodo("")         // Input clear
  // saveToLS()
}
  const toggleComplete = (index) => {
    const newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    // saveToLS()
  }

  return (
    <>
      <Navbar />
      <div className="main">
        <div className="container">
          <div className="Addtodo">
            <h2 className='heading'>Add Task</h2>
            <div className='Todo-input'>
              <input onChange={HeadingChange} value={todo} type="text" />
              {editIndex !== null ? (
                <button onClick={HeadingUpdate} className='submitBts add'>Update</button>
              ) : (
                <button onClick={HeadingAdd} className='submitBts add'>Add</button>
              )}
            </div>
          </div>
          <div className='ShowTodo'>
            <h2 className='heading'>Your Task</h2>
            <div className="todos">
              {todos.map((item, index) => {
                return (
                  <div className="todo" key={index}>
                    <div className="left-todo-side">
                      <input
                        type="checkbox"
                        checked={item.isCompleted}
                        onChange={() => toggleComplete(index)}
                      />
                      <div className={item.isCompleted ? "incom" : ""}>
                        {item.todo}
                      </div>
                    </div>
                    <div className="buttons">
                      <button onClick={() => HeadingEdit(index)} className='submitBts'>Edit</button>
                      <button onClick={() => HeadingDelete(index)} className='submitBts'>Delete</button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
