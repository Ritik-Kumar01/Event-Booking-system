const express = require("express");
const router = express.Router();

const {
  createBooking,
  getMyBookings,
} = require("../controllers/bookingController");

const { protect } = require("../middleware/authMiddleware");

// 🔴 ADD THIS TEMPORARILY FOR DEBUG
console.log({
  createBooking,
  getMyBookings,
  protect,
});

// routes
router.post("/", protect, createBooking);
router.get("/my", protect, getMyBookings);

module.exports = router;
