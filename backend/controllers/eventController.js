const Event = require("../models/Event");

// GET all events
exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch {
    res.status(500).json({ message: "Failed to fetch events" });
  }
};

// GET single event
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch {
    res.status(500).json({ message: "Failed to fetch event" });
  }
};

// CREATE event (admin)
exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch {
    res.status(500).json({ message: "Failed to create event" });
  }
};

// UPDATE event (admin)
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    event.title = req.body.title || event.title;
    event.price = req.body.price || event.price;
    event.availableTickets =
      req.body.availableTickets || event.availableTickets;
    event.date = req.body.date || event.date;

    const updated = await event.save();
    res.json(updated);
  } catch {
    res.status(500).json({ message: "Failed to update event" });
  }
};

// DELETE event (admin)
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    await event.deleteOne();
    res.json({ message: "Event removed" });
  } catch {
    res.status(500).json({ message: "Failed to delete event" });
  }
};
