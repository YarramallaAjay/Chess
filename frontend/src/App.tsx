// import { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { Home } from './components/Home'
import { Game } from './components/Game'
import "./output.css"


function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className='h-screen bg-slate-950 '>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
