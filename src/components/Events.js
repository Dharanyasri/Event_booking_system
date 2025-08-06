import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookingForm from './BookingForm';

function Events({ user }) {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/events')
      .then(res => setEvents(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container mt-5">
      <h2>Available Events</h2>
      <div className="row">
        {events.map(event => (
          <div className="col-md-4" key={event._id}>
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{event.name}</h5>
                <p className="card-text">{event.description}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => setSelectedEvent(event)}
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedEvent && (
        <BookingForm event={selectedEvent} user={user} />
      )}
    </div>
  );
}

export default Events;
