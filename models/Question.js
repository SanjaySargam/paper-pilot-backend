const mongoose = require('mongoose');


const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  options: [String], // For MCQs
  answer: String,
  marks: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['mcq', 'short', 'scientific_reason', 'medium', 'long', 'optional'],
    required: true
  },
  subjectName: {
    type: String,
    required: true
  },
  standard: {
    type: String, // or Number if standards are always numeric
    required: true
  },
  chapterNo: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Question', questionSchema);
