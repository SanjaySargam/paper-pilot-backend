const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/schoolController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

// Get school details - admin only
router.get('/', auth, checkRole('admin'), schoolController.getSchool);

// Update school details - admin only
router.put('/', auth, checkRole('admin'), schoolController.updateSchool);

module.exports = router;
