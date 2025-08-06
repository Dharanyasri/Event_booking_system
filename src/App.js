// App.js
import React, { useState } from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Events from "./components/EventList";
import BookingForm from "./components/BookingForm";
import MyBookings from "./components/MyBookings";

function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => setUser(null);

  return (
    <>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand navbar-light bg-light px-3">
        <Link className="nav-link" to="/events">Events</Link>
        <Link className="nav-link" to="/my-bookings">My Bookings</Link>
        {user && (
          <button className="btn btn-outline-danger ms-auto" onClick={handleLogout}>
            Logout
          </button>
        )}
      </nav>

      {/* Route Definitions */}
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/events"
          element={
            user ? (
              <>
                <h5 className="m-3">Welcome, {user.displayName}</h5>
                <Events user={user} />
                <BookingForm user={user} />
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/my-bookings"
          element={user ? <MyBookings /> : <Navigate to="/login" />}
        />
        <Route
          path="/"
          element={<Navigate to={user ? "/events" : "/login"} replace />}
        />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
