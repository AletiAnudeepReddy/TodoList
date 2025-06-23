import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <div className='container my-5 w-[90%] h-[80vh] mx-auto rounded-xl p-5 bg-cyan-100 min-h-screen'>
      <div className='addTodo py-4'>
        <h2 className='text-lg font-bold'>Add a Todo</h2>
        <input type='text' className='w-1/2'/>
        <button className='bg-cyan-800 hover:bg-cyan-950 p-2 text-sm font-bold py-1 text-white rounded-md mx-6'>Add</button>
      </div>
      <h2 className='text-xl font-bold'>Your Todos</h2>
      <div className='todos'>
        <div className='todo flex'>
          <div className='text'>Hey this ia my first todo</div>
          <div className='buttons'>
            <button className='bg-cyan-800 hover:bg-cyan-950 p-2 text-sm font-bold py-1 text-white rounded-md mx-1'>Edit</button>
            <button className='bg-cyan-800 hover:bg-cyan-950 p-2 text-sm font-bold py-1 text-white rounded-md mx-1'>Delete</button>

          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
