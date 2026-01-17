const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Booking = require("../models/Booking");
const Event = require("../models/Event");

// CREATE booking + stripe checkout
exports.createBooking = async (req, res) => {
  try {
    const { eventId, tickets } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: event.title,
            },
            unit_amount: event.price * 100,
          },
          quantity: tickets,
        },
      ],
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
      metadata: {
        eventId: event._id.toString(),
        userId: req.user._id.toString(),
        tickets,
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Stripe checkout failed" });
  }
};

// GET logged-in user's bookings
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("event", "title date price")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};
