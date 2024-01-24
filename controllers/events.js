const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
  const { title, description, date, time } = req.body;
  const event = new Event({ title, description, date, time, user: req.user._id });
  try {
    await event.save();
    res.status(201).send({ message: 'Event created successfully!', event });
  } catch (error) {
    res.status(400).send({ message: 'Error creating event!', error });
  }
});

module.exports = router;
router.get('/', auth, async (req, res) => {
  try {
    const events = await Event.find({ user: req.user._id });
    res.status(200).send({ events });
  } catch (error) {
    res.status(500).send({ message: 'Error fetching events!', error });
  }
});

router.get('/:id', auth, async (req, res) => {
  const id = req.params.id;
  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).send({ message: 'Event not found!' });
    }
    res.status(200).send({ event });
  } catch (error) {
    res.status(500).send({ message: 'Error fetching event!', error });
  }
});
