const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  std: String,
  subject: String,
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School'
  }
});

module.exports = mongoose.model('Teacher', teacherSchema);
