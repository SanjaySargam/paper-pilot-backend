const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
  name: String,
  address: String,
  email: String
});

module.exports = mongoose.model('School', schoolSchema);
