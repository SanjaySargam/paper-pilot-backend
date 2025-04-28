const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// Register a new school
router.post('/register', authController.registerSchool);

// Login user
router.post('/login', authController.loginUser);

// Get authenticated user
router.get('/me', auth, authController.getAuthUser);

module.exports = router;
