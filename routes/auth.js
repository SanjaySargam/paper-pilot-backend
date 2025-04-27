const express = require('express');
const { register, login } = require('../controllers/Auth');
const router = express.Router();
const Teacher = require('../models/Teacher');
 
router.post('/register-school', register);
router.post('/login', login);

module.exports = router;
