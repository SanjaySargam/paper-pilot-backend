const express = require('express');
const router = express.Router();
const School = require('../models/School');
const Teacher = require('../models/Teacher');

// Register school
router.post('/register-school', async (req, res) => {
  const { name, address, email } = req.body;
  const school = new School({ name, address, email });
  await school.save();
  res.json({ message: 'School registered', school });
});

// Add teacher
router.post('/add-teacher', async (req, res) => {
  const { name, email, password, std, subject, schoolId } = req.body;
  const teacher = new Teacher({ name, email, password, std, subject, schoolId });
  await teacher.save();
  res.json({ message: 'Teacher added', teacher });
});

module.exports = router;
