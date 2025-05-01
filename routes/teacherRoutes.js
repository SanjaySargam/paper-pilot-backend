const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

// Create a new teacher - admin only
router.post('/createTeacher', auth, checkRole('admin'), teacherController.createTeacher);

// Get all teachers for a school - admin only
router.get('/', auth, checkRole('admin'), teacherController.getAllTeachers);

// Get teacher by ID
router.get('/:id', auth, teacherController.getTeacherById);

// Update teacher - admin only
router.put('/:id', auth, checkRole('admin'), teacherController.updateTeacher);

// Delete teacher - admin only
router.delete('/:id', auth, checkRole('admin'), teacherController.deleteTeacher);

module.exports = router;
