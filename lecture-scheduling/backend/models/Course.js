const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
  description: { type: String, required: true },
  image: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);