import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import DropQuestLanding from "./pages/Home";
import Login from "./pages/Login";
import AirDrop from "./pages/AirDrop";
import MyPage from "./pages/MyPage";
import AnnouncementsPage from "./pages/Annoucements";
import AnnouncementDetail from "./components/annnoncementDetails";
import PublicRoute from "./components/PublicRoute";
import UserProtectedRoute from "./components/UserProtectedRoute";
import { Toaster } from "react-hot-toast";
import AdminDashboard from "./pages/admin/AdminHome";
// import AnnouncementsManagement from "./components/AdminDashboard/AnnouncementsManagement";
// import PointsManagement from "./components/AdminDashboard/PointsManagement";
// import UserManagement from "./components/AdminDashboard/UserManagement";

function App() {
  const location = useLocation();

  // Hide navbar for admin routes
  const hideNavbar = location.pathname.startsWith("/admin");
  return (
    <div>
      {!hideNavbar && <Navbar />}

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
              <Login />
            </PublicRoute>
          }
        />

        <Route path="/" element={<DropQuestLanding />} />
        <Route
          path="/air-drop"
          element={
            <UserProtectedRoute>
              <AirDrop />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/my-page"
          element={
            <UserProtectedRoute>
              <MyPage />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/announcements"
          element={
            <UserProtectedRoute>
              <AnnouncementsPage />
            </UserProtectedRoute>
          }
        />
        <Route
          path="/announcements/:id"
          element={
            <UserProtectedRoute>
              <AnnouncementDetail />
            </UserProtectedRoute>
          }
        />
    

        {/* Admin-Dashboard */}
        <Route path="/admin">
          <Route index element={<AdminDashboard />} />
          {/* <Route path="points-management" element={<PointsManagement />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="announcements" element={<AnnouncementsManagement />} /> */}
        </Route>
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;
