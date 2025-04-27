const jwt = require('jsonwebtoken');
const School = require('../models/School');

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const school = await School.findById(decodedToken.schoolId);
    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }

    req.school = school;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = { authenticate };
