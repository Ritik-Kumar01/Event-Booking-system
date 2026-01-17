import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useAuth } from "../context/AuthContext";
import "./EventCalendar.css";

function EventCalendar() {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventsOnDate, setEventsOnDate] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch("http://localhost:5000/api/events", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await res.json();
      setEvents(data);
    };

    fetchEvents();
  }, [user]);

  const handleDateChange = (date) => {
    setSelectedDate(date);

    const filtered = events.filter(
      (event) =>
        new Date(event.date).toDateString() === date.toDateString()
    );

    setEventsOnDate(filtered);
  };

  // Highlight dates having events
  const tileClassName = ({ date }) => {
    const hasEvent = events.some(
      (event) =>
        new Date(event.date).toDateString() === date.toDateString()
    );

    return hasEvent ? "event-day" : null;
  };

  return (
    <div className="calendar-container">
      <h2>📅 Event Calendar</h2>

      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileClassName={tileClassName}
      />

      <div className="event-list">
        <h3>
          Events on {selectedDate.toDateString()}
        </h3>

        {eventsOnDate.length === 0 ? (
          <p>No events on this day</p>
        ) : (
          eventsOnDate.map((event) => (
            <div key={event._id} className="event-card">
              <h4>{event.title}</h4>
              <p>₹{event.price}</p>
              <p>Tickets Left: {event.availableTickets}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default EventCalendar;
