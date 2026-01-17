import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Events.css";

function Events() {
  const [events, setEvents] = useState([]);
  const [tickets, setTickets] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { user } = useAuth();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/events", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) {
          setError(data.message || "Failed to load events");
          return;
        }

        setEvents(data);
      } catch {
        setError("Server error");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [user]);

  const handleTicketChange = (eventId, value) => {
    setTickets({ ...tickets, [eventId]: value });
  };

  const handleBookTicket = async (event) => {
    const ticketCount = tickets[event._id] || 1;

    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          eventId: event._id,
          tickets: ticketCount,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Booking failed");
        return;
      }

      window.location.href = data.url;
    } catch {
      alert("Server error while booking");
    }
  };

  if (loading) return <p className="loading">Loading events...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="events-container">
      <h2 className="page-title">🎫 Available Events</h2>

      <div className="events-grid">
        {events.map((event) => (
          <div className="event-card" key={event._id}>
            <h3>{event.title}</h3>
            <p><strong>Date:</strong> {new Date(event.date).toDateString()}</p>
            <p><strong>Price:</strong> ₹{event.price}</p>
            <p><strong>Tickets Left:</strong> {event.availableTickets}</p>

            <div className="ticket-row">
              <input
                type="number"
                min="1"
                value={tickets[event._id] || 1}
                onChange={(e) =>
                  handleTicketChange(event._id, Number(e.target.value))
                }
              />
              <button onClick={() => handleBookTicket(event)}>
                Book Ticket
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;
