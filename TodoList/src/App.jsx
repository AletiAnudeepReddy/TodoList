import { useState,useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  const toggleFinished=(e)=>{
    setshowFinished(!showFinished)
  }

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
    localstorage()
    settodos(newTodos)
    
  }
  const handleDelete=(e,id)=>{
    let newTodos=todos.filter(item=>{
      return item.id!==id
    });
    localstorage()
    settodos(newTodos)
    
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
    localstorage();
    settodos(newTodos)

  }

  return (
    <>
    <Navbar/>
    <div className='md:container mx-4 my-5 md:w-1/2  md:mx-auto rounded-xl p-5 md:p-6 bg-cyan-100 min-h-screen'>
    <h1 className='font-bold text-center text-xl'>xTask - Manage your Todos at one place</h1>
      <div className='addTodo py-4 flex flex-col gap-4'>
        <h2 className='text-lg font-bold'>Add a Todo</h2>
        <input onChange={handleChange} value={todo} type='text' className='w-full rounded-full px-5 py-1'/>
        <button onClick={handleAdd} disabled={todo.length<3} className='bg-cyan-800 hover:bg-cyan-950 p-2 text-sm font-bold py-1 text-white rounded-md'>Save</button>
      </div>
      <input className='my-4' type='checkbox' onChange={toggleFinished} checked={showFinished}/> Show Finished
      <h2 className='text-xl font-bold'>Your Todos</h2>
      <div className='todos'>
      {todos.length===0 && <div className='m-5'>No Todos to display</div>}
      {todos.map(item=>{
        return (showFinished||!item.isCompleted) && <div key={item.id} className='todo flex w-full md:w-3/5 my-3 justify-between'>
          <div className='flex gap-5'>
          <input name={item.id} onChange={handleCheckbox} type='checkbox' checked={item.isCompleted} id=''/>
          <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
          </div>
          <div className='buttons flex h-full'>
            <button onClick={(e)=>handleEdit(e,item.id)} className='bg-cyan-800 hover:bg-cyan-950 p-2 text-sm font-bold py-1 text-white rounded-md mx-1'><FaEdit /></button>
            <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-cyan-800 hover:bg-cyan-950 p-2 text-sm font-bold py-1 text-white rounded-md mx-1'><MdDelete /></button>

          </div>
        </div>
      })}
      </div>
    </div>
    </>
  )
}

export default App
