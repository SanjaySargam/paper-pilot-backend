const User = require('../models/User');
const Teacher = require('../models/Teacher');
const { generateRandomPassword } = require('../utils/passwordUtils');

// Create a new teacher
exports.createTeacher = async (req, res) => {
  const { teacherName, email, mobileNumber, assignments } = req.body;

  try {
    // Check if email already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Teacher already exists with this email' });
    }

    // Generate random password for teacher
    const password = generateRandomPassword();

    // Create user for teacher
    const user = new User({
      email,
      password, // This will be hashed in the pre-save hook
      role: 'teacher',
      schoolId: req.user.schoolId
    });

    await user.save();

    // Create teacher profile
    const teacher = new Teacher({
      userId: user._id,
      teacherName,
      email,
      mobileNumber,
      schoolId: req.user.schoolId,
      assignments: assignments || []
    });

    await teacher.save();

    res.status(201).json({
      teacher,
      generatedPassword: password // Send back the generated password
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get all teachers for a school
exports.getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find({ schoolId: req.user.schoolId });
    res.json(teachers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get teacher by ID
exports.getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    // Check if teacher belongs to the school
    if (teacher.schoolId.toString() !== req.user.schoolId.toString()) {
      return res.status(403).json({ message: 'Not authorized to access this teacher' });
    }

    res.json(teacher);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.status(500).send('Server error');
  }
};

// Update teacher
exports.updateTeacher = async (req, res) => {
  const { teacherName, mobileNumber, assignments } = req.body;

  try {
    let teacher = await Teacher.findById(req.params.id);
    
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    // Check if teacher belongs to the school
    if (teacher.schoolId.toString() !== req.user.schoolId.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this teacher' });
    }

    // Update fields
    if (teacherName) teacher.teacherName = teacherName;
    if (mobileNumber) teacher.mobileNumber = mobileNumber;
    if (assignments) teacher.assignments = assignments;

    await teacher.save();

    res.json(teacher);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.status(500).send('Server error');
  }
};

// Delete teacher
exports.deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    // Check if teacher belongs to the school
    if (teacher.schoolId.toString() !== req.user.schoolId.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this teacher' });
    }

    // Delete teacher
    await Teacher.findByIdAndRemove(req.params.id);
    
    // Delete associated user
    await User.findByIdAndRemove(teacher.userId);

    res.json({ message: 'Teacher removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    res.status(500).send('Server error');
  }
};
