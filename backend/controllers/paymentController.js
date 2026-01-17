const Stripe = require("stripe");
const Booking = require("../models/Booking");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

exports.createPaymentIntent = async (req, res) => {
  try {
    const { bookingId } = req.body;

    if (!bookingId) {
      return res.status(400).json({ message: "Booking ID required" });
    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: booking.totalAmount * 100, // Stripe uses paise
      currency: "inr",
      metadata: {
        bookingId: booking._id.toString()
      }
    });

    res.json({
      clientSecret: paymentIntent.client_secret
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
