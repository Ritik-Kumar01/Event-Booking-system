import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2 className="logo" onClick={() => navigate("/events")}>
          🎟 Event Booking
        </h2>
      </div>

      {user && (
        <div className="navbar-right">
          {/* Events */}
          <Link to="/events" className="nav-btn">
            Events
          </Link>

          {/* Calendar */}
          <Link to="/calendar" className="nav-btn">
            Calendar
          </Link>

          {/* Admin (only for admin users) */}
          {user.role === "admin" && (
            <Link to="/admin" className="nav-btn">
              Admin
            </Link>
          )}

          {/* My Bookings */}
          <Link to="/my-bookings" className="nav-btn">
            My Bookings
          </Link>

          {/* Logout */}
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
