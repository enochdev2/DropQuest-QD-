
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import DropQuestLanding from './pages/Home'
import Login from './pages/Login'

function App() {
  

  return (
    <div>
      <Navbar/>

      <Routes>
         <Route path='/' element={ <DropQuestLanding/>}/>
         <Route path='/login' element={ <Login/>}/>
      </Routes>
      
    </div>
  )
}

export default App
