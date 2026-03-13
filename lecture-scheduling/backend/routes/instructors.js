const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// Get all instructors
router.get('/', auth, async (req, res) => {
  try {
    const instructors = await User.find({ role: 'instructor' }).select('-password');
    res.json(instructors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;