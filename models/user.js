const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  workouts: { type: Number, default: 0 },
  minutes: { type: Number, default: 0 }
});

module.exports = mongoose.model('User', UserSchema);
