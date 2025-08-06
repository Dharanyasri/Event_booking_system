import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user?.email) return;

    console.log("Fetching bookings for:", user.email); // ✅ Debug

    fetch(`http://localhost:5000/api/bookings?email=${user.email}`)
      .then(res => res.json())
      .then(data => {
        console.log("Bookings received:", data); // ✅ Debug
        setBookings(data);
      })
      .catch(err => {
        console.error("Failed to fetch bookings:", err);
      });
  }, [user?.email]);

  async function handleCancel(id) {
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${id}`);
      setBookings(bookings.filter((b) => b._id !== id));
    } catch (err) {
      console.error('Error cancelling booking:', err);
    }
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul className="list-group">
          {bookings.map((booking) => (
            <li
              key={booking._id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{booking.eventTitle}</strong>
                <br />
                Seats: {booking.seats}
              </div>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleCancel(booking._id)}
              >
                Cancel
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyBookings;