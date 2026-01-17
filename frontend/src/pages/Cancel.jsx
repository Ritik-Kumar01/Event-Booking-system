import { Link } from "react-router-dom";

function Cancel() {
  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1>❌ Payment Cancelled</h1>
      <p>Your payment was not completed.</p>

      <Link to="/events">
        <button
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            background: "#555",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Try Again
        </button>
      </Link>
    </div>
  );
}

export default Cancel;
