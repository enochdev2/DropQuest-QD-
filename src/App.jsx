import { lazy, Suspense } from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import PublicRoute from "./components/PublicRoute";
import UserProtectedRoute from "./components/UserProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import ManagerRoute from "./components/ManagerRoute";

// Lazy-loaded page components (core ones always available; admin/manager lazy but only rendered if eligible)
const DropQuestLanding = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const AirDrop = lazy(() => import("./pages/AirDrop"));
const MyPage = lazy(() => import("./pages/MyPage"));
const AnnouncementsPage = lazy(() => import("./pages/Annoucements"));
const AnnouncementDetail = lazy(() => import("./components/annnoncementDetails"));
const PointExchange = lazy(() => import("./pages/PointExchange"));
const QuestionNAnswer = lazy(() => import("./pages/QNA"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminHome"));
const ManagerDashboard = lazy(() => import("./pages/manager/ManagerHome"));

// Shared auth hook to avoid duplication (extracted from your AdminRoute/ManagerRoute logic)
function useUserRole() {
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    const user = JSON.parse(atob(token.split(".")[1]));
    return user;
  } catch (error) {
    // Invalid token, treat as null
    localStorage.removeItem("token"); // Optional: clean up invalid token
    console.error("Invalid token:", error); // For debugging
    return null;
  }
}

function App() {
  const location = useLocation();
  const user = useUserRole(); // Gets full user object or null

  // Hide navbar for admin/manager routes
  const hideNavbar = location.pathname.startsWith("/admin") 
  // || location.pathname.startsWith("/manager");
  
  // Simple fallback for lazy loading
  const loadingFallback = <div className="flex items-center justify-center min-h-screen">Loading...</div>;

  // Conditional elements for admin/manager to avoid rendering lazy components if not eligible
  const adminElement = user?.admin ? (
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  ) : (
    <Navigate to="/" replace />
  );

  const managerElement = user?.manager ? (
    <ManagerRoute>
      <ManagerDashboard />
    </ManagerRoute>
  ) : (
    <Navigate to="/" replace />
  );

  return (
    <div className="overflow-x-hidden">
      {!hideNavbar && <Navbar />}

      <Suspense fallback={loadingFallback}>
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
            path="/signin"
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

          <Route path="/question-answer" element={<QuestionNAnswer />} />
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

          <Route
            path="/point-exchange/"
            element={
              <UserProtectedRoute>
                <PointExchange />
              </UserProtectedRoute>
            }
          />

          {/* Admin Route: Always defined, but element conditionally renders lazy component or redirect */}
          <Route path="/admin" element={adminElement} />

          {/* Manager Route: Always defined, but element conditionally renders lazy component or redirect */}
          <Route path="/manager" element={managerElement} />

          {/* Catch-all for unauthorized/404: Redirect to home (or login if unauth) */}
          <Route path="*" element={<Navigate to="/" replace />} />

          {/* Uncomment and add sub-routes if re-enabled (conditionally if needed) */}
          {/* <Route path="/admin">
            <Route path="points-management" element={<PointsManagement />} />
            <Route path="user-management" element={<UserManagement />} />
            <Route path="announcements" element={<AnnouncementsManagement />} />
          </Route> */}
        </Routes>
      </Suspense>

      <Toaster />
    </div>
  );
}

export default App;



























// import { Route, Routes, useLocation } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import DropQuestLanding from "./pages/Home";
// import Login from "./pages/Login";
// import AirDrop from "./pages/AirDrop";
// import MyPage from "./pages/MyPage";
// import AnnouncementsPage from "./pages/Annoucements";
// import AnnouncementDetail from "./components/annnoncementDetails";
// import PublicRoute from "./components/PublicRoute";
// import UserProtectedRoute from "./components/UserProtectedRoute";
// import { Toaster } from "react-hot-toast";
// import AdminDashboard from "./pages/admin/AdminHome";
// import PointExchange from "./pages/PointExchange";
// import AdminRoute from "./components/AdminRoute";
// import QuestionNAnswer from "./pages/QNA";
// import ManagerRoute from "./components/ManagerRoute";
// import ManagerDashboard from "./pages/manager/ManagerHome";
// // import AnnouncementsManagement from "./components/AdminDashboard/AnnouncementsManagement";
// // import PointsManagement from "./components/AdminDashboard/PointsManagement";
// // import UserManagement from "./components/AdminDashboard/UserManagement";

// function App() {
//   const location = useLocation();

//   // Hide navbar for admin routes
//   const hideNavbar = location.pathname.startsWith("/admin");
//   return (
//     <div className="overflow-x-hidden">
//       {!hideNavbar && <Navbar />}

//       <Routes>
//         <Route
//           path="/login"
//           element={
//             <PublicRoute>
//               <Login />
//             </PublicRoute>
//           }
//         />
//         <Route
//           path="/signin"
//           element={
//             <PublicRoute>
//               <Login />
//             </PublicRoute>
//           }
//         />
//         <Route
//           path="/signup"
//           element={
//             <PublicRoute>
//               <Login />
//             </PublicRoute>
//           }
//         />

//         <Route path="/" element={<DropQuestLanding />} />

//         <Route path="/question-answer" element={<QuestionNAnswer />} />
//         <Route
//           path="/air-drop"
//           element={
//             <UserProtectedRoute>
//               <AirDrop />
//             </UserProtectedRoute>
//           }
//         />
//         <Route
//           path="/my-page"
//           element={
//             <UserProtectedRoute>
//               <MyPage />
//             </UserProtectedRoute>
//           }
//         />
//         <Route
//           path="/announcements"
//           element={
//             <UserProtectedRoute>
//               <AnnouncementsPage />
//             </UserProtectedRoute>
//           }
//         />
//         <Route
//           path="/announcements/:id"
//           element={
//             <UserProtectedRoute>
//               <AnnouncementDetail />
//             </UserProtectedRoute>
//           }
//         />

//         <Route
//           path="/point-exchange/"
//           element={
//             <UserProtectedRoute>
//               <PointExchange />
//             </UserProtectedRoute>
//           }
//         />

//         {/* Admin-Dashboard */}
//         <Route
//           path="/admin"
//           element={
//             <AdminRoute>
//               <AdminDashboard />
//             </AdminRoute>
//           }
//         />
//         {/* Manager-Dashboard */}
//         <Route
//           path="/manager"
//           element={
//             <ManagerRoute>
//               <ManagerDashboard />
//             </ManagerRoute>
//           }
//         />
//         {/* <Route path="/admin"> */}
//         {/* <Route path="points-management" element={<PointsManagement />} />
//           <Route path="user-management" element={<UserManagement />} />
//           <Route path="announcements" element={<AnnouncementsManagement />} /> */}
//         {/* </Route> */}
//       </Routes>

//       <Toaster />
//     </div>
//   );
// }

// export default App;
