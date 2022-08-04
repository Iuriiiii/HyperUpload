import { useState } from 'react'
import './App.css'
import Aside from './components/aside'
import Header from './components/header'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Header />
      <Aside />
    </div>
  )
}

export default App
