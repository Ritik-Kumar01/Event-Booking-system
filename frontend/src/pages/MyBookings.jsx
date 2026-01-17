import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./MyBookings.css";

function MyBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/bookings/my", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Failed to load bookings");
          return;
        }

        setBookings(data);
      } catch (err) {
        setError("Server error");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  if (loading) return <p className="loading">Loading bookings...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="bookings-container">
      <h2>🎟 My Bookings</h2>

      {bookings.length === 0 ? (
        <div className="empty">
          <p>No bookings yet</p>
        </div>
      ) : (
        bookings.map((booking) => (
          <div key={booking._id} className="booking-card">
            <div className="booking-header">
              <h3>{booking.event.title}</h3>
              <span
                className={`status ${
                  booking.paymentStatus === "paid" ? "paid" : "pending"
                }`}
              >
                {booking.paymentStatus.toUpperCase()}
              </span>
            </div>

            <div className="booking-details">
              <p>
                <strong>Date:</strong>{" "}
                {new Date(booking.event.date).toDateString()}
              </p>
              <p>
                <strong>Tickets:</strong> {booking.tickets}
              </p>
              <p>
                <strong>Total Paid:</strong> ₹{booking.totalAmount}
              </p>
              <p className="booking-time">
                Booked on{" "}
                {new Date(booking.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default MyBookings;
