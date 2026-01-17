import { Link } from "react-router-dom";

function Success() {
  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1>🎉 Payment Successful!</h1>
      <p>Your booking has been confirmed.</p>

      <Link to="/events">
        <button
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            background: "green",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Go to Events
        </button>
      </Link>
    </div>
  );
}

export default Success;
