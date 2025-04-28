const jwt = require('jsonwebtoken');
const School = require('../models/School');

// Register a new school
const register = async (req, res, next) => {
  const { schoolName, email, password, address } = req.body;

  try {
    // const hashedPassword = await bcrypt.hash(password, 10);
    const school = new School({ schoolName, email, address, password });
    await school.save();
    res.json({ message: 'Registration successful' });
  } catch (error) {
    next(error);
  }
};

// Login with an existing school
const login = async (req, res, next) => {
  const { schoolName, password } = req.body;

  try {
    const school = await School.findOne({ schoolName });
    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }

    const passwordMatch = await school.comparePassword(password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign({ userId: school._id }, process.env.SECRET_KEY, {
      expiresIn: '1 hour'
    });
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
