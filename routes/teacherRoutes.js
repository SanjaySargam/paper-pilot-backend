const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');

// Create a new teacher - admin only
router.post('/createTeacher', auth, checkRole('admin'), teacherController.createTeacher);

// Get all teachers for a school - admin only
router.get('/', auth, teacherController.getAllTeachers);

// Get teacher by ID
router.get('/:id', auth, teacherController.getTeacherById);

// Update teacher - admin only
router.put('/:id', auth, teacherController.updateTeacher);

// Delete teacher - admin only
router.delete('/:id', auth, teacherController.deleteTeacher);

module.exports = router;
