import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const BookingForm = ({ user }) => {
  const [form, setForm] = useState({
    eventTitle: "",
    seats: 1,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      ...form,
      userEmail: user.email, // Add user email to booking
      userName: user.displayName || "", // Optional
    };

    try {
      await axios.post("http://localhost:5000/api/book", bookingData);
      alert("Booking successful!");
      setForm({ eventTitle: "", seats: 1 });
    } catch (err) {
      console.error("Booking failed", err);
      alert("Booking failed");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Book an Event</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Event Title</label>
          <input
            type="text"
            name="eventTitle"
            className="form-control"
            value={form.eventTitle}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group mt-2">
          <label>Number of Seats</label>
          <input
            type="number"
            name="seats"
            className="form-control"
            value={form.seats}
            onChange={handleChange}
            min="1"
            required
          />
        </div>
        <button type="submit" className="btn btn-success mt-3">
          Book Now
        </button>
      </form>
    </div>
  );
};

export default BookingForm;

