const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Event = require("../models/Event");
const Booking = require("../models/Booking");

exports.handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // ✅ Handle successful payment
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const { eventId, tickets, userId } = session.metadata;

    try {
      // 1️⃣ Reduce tickets
      const eventDoc = await Event.findById(eventId);

      if (!eventDoc) {
        return res.status(404).json({ message: "Event not found" });
      }

      eventDoc.availableTickets -= Number(tickets);
      await eventDoc.save();

      // 2️⃣ Create booking record
      await Booking.create({
  user: userId,
  event: eventId,
  tickets,
  totalAmount: session.amount_total / 100, // ✅ FIX
  paymentStatus: "paid",
  stripeSessionId: session.id,
});



      console.log("✅ Tickets reduced & booking saved");
    } catch (error) {
      console.error("Webhook DB error:", error);
    }
  }

  res.json({ received: true });
};
