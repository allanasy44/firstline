const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const auth = require('../utils/auth.js');

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find({});
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create event //
router.post('/', auth.verifyToken, async (req, res) => {
  const { title, description, date, time } = req.body;
  try {
    const event = new Event({
      title,
      description,
      date,
      time,
      userId: req.user._id,
    });
    await event.save();
    res.json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//  event  id//
function name(params) {
  router.get('/:id', async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
      res.json(event);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
}

// Update event (authenticated and owner)
router.put('/:id'), auth.verifyToken, async function (req, res) {
        const { title, description, date, time } = req.body;
        try {
            const event = await Event.findById(req.params.id);
            if (!event) {
                return res.status(404).json({ message: 'Event not found' });
            }
            if (event.userId.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: 'Unauthorized' });
            }
            event.title;
        } finally { }
    }