import { useState } from 'react'
import './App.css'
import Aside from './components/aside'
import Header from './components/header'
import LogCard from './components/LogCard'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Header />
      <LogCard />
      <Aside />
    </div>
  )
}

export default App
