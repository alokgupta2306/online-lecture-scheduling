const express = require('express');
const router = express.Router();
const Lecture = require('../models/Lecture');
const auth = require('../middleware/auth');

// Get all lectures (admin)
router.get('/', auth, async (req, res) => {
  try {
    const lectures = await Lecture.find()
      .populate('course', 'name level')
      .populate('instructor', 'name email');
    res.json(lectures);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get lectures for logged in instructor
router.get('/my-lectures', auth, async (req, res) => {
  try {
    const lectures = await Lecture.find({ instructor: req.user.id })
      .populate('course', 'name level description image')
      .populate('instructor', 'name email');
    res.json(lectures);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add lecture (with clash detection)
router.post('/', auth, async (req, res) => {
  try {
    const { course, instructor, date, batchName } = req.body;

    // CLASH DETECTION - Core Logic!
    const lectureDate = new Date(date);
    const startOfDay = new Date(lectureDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(lectureDate.setHours(23, 59, 59, 999));

    const clash = await Lecture.findOne({
      instructor,
      date: { $gte: startOfDay, $lte: endOfDay }
    });

    if (clash) {
      return res.status(400).json({ 
        message: 'This instructor is already assigned a lecture on this date!' 
      });
    }

    const lecture = new Lecture({ course, instructor, date, batchName });
    await lecture.save();

    const populated = await lecture.populate([
      { path: 'course', select: 'name level' },
      { path: 'instructor', select: 'name email' }
    ]);

    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete lecture
router.delete('/:id', auth, async (req, res) => {
  try {
    await Lecture.findByIdAndDelete(req.params.id);
    res.json({ message: 'Lecture deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;