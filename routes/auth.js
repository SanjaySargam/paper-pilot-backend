const express = require('express');
const router = express.Router();
const Teacher = require('../models/Teacher');
 
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const teacher = await Teacher.findOne({ email, password }); // plaintext for simplicity
  if (!teacher) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  res.json({ message: 'Login successful', teacher });
});

module.exports = router;
