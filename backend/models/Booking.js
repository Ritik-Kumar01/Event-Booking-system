const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true
    },

    tickets: {
      type: Number,
      required: true
    },

    totalAmount: {
      type: Number,
      required: true
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Booking", bookingSchema);
