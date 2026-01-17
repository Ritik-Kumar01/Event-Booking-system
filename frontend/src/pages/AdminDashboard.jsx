import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

function AdminDashboard() {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch("http://localhost:5000/api/events", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await res.json();
      setEvents(data);
      setLoading(false);
    };

    fetchEvents();
  }, [user]);

  const deleteEvent = async (id) => {
    if (!window.confirm("Delete this event?")) return;

    await fetch(`http://localhost:5000/api/events/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    setEvents(events.filter((e) => e._id !== id));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin Dashboard</h2>

      {events.map((event) => (
        <div
          key={event._id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "10px",
          }}
        >
          <h3>{event.title}</h3>
          <p>Price: ₹{event.price}</p>
          <p>Tickets: {event.availableTickets}</p>

          <button
            onClick={() => deleteEvent(event._id)}
            style={{
              background: "red",
              color: "white",
              border: "none",
              padding: "6px 10px",
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;
