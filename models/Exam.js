const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject',
      required: true
    },
    standard: {
      type: Number,
      required: true,
      min: 1,
      max: 10
    },
    examType: {
      type: String,
      enum: ['unit1', 'unit2', 'semester1', 'semester2'],
      required: true
    },
    totalMarks: {
      type: Number,
      default: 40
    },
    sections: [{
      type: {
        type: String,
        enum: ['mcq', 'short', 'scientific_reason', 'medium', 'long', 'optional'],
        required: true
      },
      instruction: String,
      questionCount: {
        total: Number,
        toAnswer: Number
      },
      marks: Number,
      questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
      }]
    }],
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
  module.exports = mongoose.model('Exam', examSchema);
