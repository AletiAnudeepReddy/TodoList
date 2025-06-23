import { useState,useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])

  useEffect(() => {
    let todoString=localStorage.getItem("todos")
    if (todoString){
      let todos=JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])
  

  const localstorage=(params)=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  const handleEdit=(e,id)=>{
    let t=todos.filter(i=>i.id===id)
    settodo(t[0].todo)
    let newTodos=todos.filter(item=>{
      return item.id!==id
    });
    settodos(newTodos)
    localstorage()
  }
  const handleDelete=(e,id)=>{
    let newTodos=todos.filter(item=>{
      return item.id!==id
    });
    settodos(newTodos)
    localstorage()
  }
  const handleAdd=()=>{
    settodos([...todos,{id:uuidv4(),todo,isCompleted:false}])
    settodo("")
    localstorage()
  }
  const handleChange=(e)=>{
    settodo(e.target.value)
  }
  const handleCheckbox=(e)=>{
    let id=e.target.name;
    let index=todos.findIndex(item=>{
      return item.id===id;
    })
    let newTodos=[...todos];
    newTodos[index].isCompleted=!newTodos[index].isCompleted;
    settodos(newTodos)
    localstorage();
  }

  return (
    <>
    <Navbar/>
    <div className='container my-5 w-[90%] h-[80vh] mx-auto rounded-xl p-5 bg-cyan-100 min-h-screen'>
      <div className='addTodo py-4'>
        <h2 className='text-lg font-bold'>Add a Todo</h2>
        <input onChange={handleChange} value={todo} type='text' className='w-1/2'/>
        <button onClick={handleAdd} className='bg-cyan-800 hover:bg-cyan-950 p-2 text-sm font-bold py-1 text-white rounded-md mx-6'>Add</button>
      </div>
      <h2 className='text-xl font-bold'>Your Todos</h2>
      <div className='todos'>
      {todos.length===0 && <div className='m-5'>No Todos to display</div>}
      {todos.map(item=>{
        return <div key={item.id} className='todo flex w-1/4 my-3 justify-between'>
          <div className='flex gap-5'>
          <input name={item.id} onChange={handleCheckbox} type='checkbox' value={item.isCompleted} id=''/>
          <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
          </div>
          <div className='buttons flex h-full'>
            <button onClick={(e)=>handleEdit(e,item.id)} className='bg-cyan-800 hover:bg-cyan-950 p-2 text-sm font-bold py-1 text-white rounded-md mx-1'>Edit</button>
            <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-cyan-800 hover:bg-cyan-950 p-2 text-sm font-bold py-1 text-white rounded-md mx-1'>Delete</button>

          </div>
        </div>
      })}
      </div>
    </div>
    </>
  )
}

export default App
