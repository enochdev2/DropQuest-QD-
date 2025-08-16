
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import DropQuestLanding from './pages/Home'
import Login from './pages/Login'
import AirDrop from './pages/AirDrop'
import MyPage from './pages/MyPage'
import AnnouncementsPage from './pages/Annoucements'
import AnnouncementDetail from './components/annnoncementDetails'
import PublicRoute from './components/PublicRoute'
import UserProtectedRoute from './components/UserProtectedRoute'

function App() {
  

  return (
    <div>
      <Navbar/>
      <Routes>
      <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Login/> 
            </PublicRoute>
          }
        />

         <Route path='/' element={ <DropQuestLanding/>}/>
        <Route
          path="/air-drop"
          element={
            <UserProtectedRoute>
              <AirDrop/> 
            </UserProtectedRoute>
          }
        />
        <Route
          path="/my-page"
          element={
            <UserProtectedRoute>
              <MyPage/> 
            </UserProtectedRoute>
          }
        />
        <Route
          path="/announcements"
          element={
            <UserProtectedRoute>
              <AnnouncementsPage/> 
            </UserProtectedRoute>
          }
        />
        <Route
          path="/announcements/:id"
          element={
            <UserProtectedRoute>
              <AnnouncementDetail/> 
            </UserProtectedRoute>
          }
        />
         {/* <Route path='/login' element={ <Login/>}/> */}
         {/* <Route path='/air-drop' element={ <AirDrop/>}/> */}
         {/* <Route path='/my-page' element={ <MyPage/>}/> */}
         {/* <Route path='/announcements' element={ <AnnouncementsPage/>}/> */}
         {/* <Route path='/announcements/:id' element={ <AnnouncementDetail/>}/> */}
      </Routes>
      
    </div>
  )
}

export default App
