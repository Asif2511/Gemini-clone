import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SiderBar from './components/sidebar/sidebar'
import Main from './components/main/main'
import ContexProvider from './context/context'
function App() {
  const [count, setCount] = useState(0)

  return (
   <ContexProvider>
    <SiderBar/>
    <Main/>
    </ContexProvider>
  )
}

export default App
