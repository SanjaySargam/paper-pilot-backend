const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    standard: {
      type: Number,
      required: true,
      min: 1,
      max: 10
    }
  });
  
  module.exports = mongoose.model('Subject', subjectSchema);
