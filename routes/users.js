// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/', async (req, res) => {
  try {
    const { userName, workoutType, workoutMinutes } = req.body;

    const newUser = new User({ 
      userName,
      workoutType,
      workoutMinutes: Number(workoutMinutes) 
    });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (err) {
    console.error('❌ Error creating user:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.error('❌ Error fetching users:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});

// 👉 Update user by ID
router.put('/:id', async (req, res) => {
  try {
    const { userName, workoutType, workoutMinutes } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { userName, workoutType, workoutMinutes: Number(workoutMinutes) },
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error('❌ Error updating user:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});

// 👉 Delete user by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    console.error('❌ Error deleting user:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;

