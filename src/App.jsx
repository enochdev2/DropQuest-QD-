
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import DropQuestLanding from './pages/Home'
import Login from './pages/Login'
import AirDrop from './pages/AirDrop'
import MyPage from './pages/MyPage'
import AnnouncementsPage from './pages/Annoucements'

function App() {
  

  return (
    <div>
      <Navbar/>

      <Routes>
         <Route path='/' element={ <DropQuestLanding/>}/>
         <Route path='/login' element={ <Login/>}/>
         <Route path='/air-drop' element={ <AirDrop/>}/>
         <Route path='/my-page' element={ <MyPage/>}/>
         <Route path='/announcements' element={ <AnnouncementsPage/>}/>
      </Routes>
      
    </div>
  )
}

export default App
