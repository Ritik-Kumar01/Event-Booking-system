import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import MyBookings from "./pages/MyBookings";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import EventCalendar from "./pages/EventCalendar";



function App() {
  const location = useLocation();

  // ❌ Hide navbar on login & register
  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <Events />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />
       <Route
  path="/calendar"
  element={
    <ProtectedRoute>
      <EventCalendar />
    </ProtectedRoute>
  }
/>



        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/success"
          element={
            <ProtectedRoute>
              <Success />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cancel"
          element={
            <ProtectedRoute>
              <Cancel />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
