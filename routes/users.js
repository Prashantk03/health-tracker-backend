// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/', async (req, res) => {
  try {
    const { name, workouts, minutes } = req.body;

    const newUser = new User({ name, workouts, minutes });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (err) {
    console.error('❌ Error creating user:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;

