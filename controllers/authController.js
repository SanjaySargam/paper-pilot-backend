const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../models/User');
const School = require('../models/School');

// Register a new school with admin
exports.registerSchool = async (req, res) => {
    const { schoolName, address, email, password } = req.body;
  
    try {
      console.log('Starting school registration process for:', email);
      
      // Check if email already exists
      let existingUser = await User.findOne({ email });
      if (existingUser) {
        console.log('User already exists with email:', email);
        return res.status(400).json({ message: 'User already exists with this email' });
      }
  
      // Create a new user - temporarily without schoolId
      let user = new User({
        email,
        password,
        role: 'admin',
        // Remove the schoolId requirement for now
      });
  
      // If schoolId is required in your schema, we need to modify the validation
      // Option 1: Temporarily disable validation for schoolId if possible
      // user.validateSync({ pathsToSkip: ['schoolId'] });
      
      // Option 2: If your schema allows, set a temporary placeholder value
      // user.schoolId = mongoose.Types.ObjectId();
  
      // Option 3: Modify your User schema to make schoolId optional initially
      // This is the recommended approach (modify your User schema)
  
      // Save the user first
      const savedUser = await user.save();
      console.log('User saved successfully with ID:', savedUser._id);
  
      // Now create school with the valid user._id
      const school = new School({
        schoolName,
        address,
        email,
        adminId: savedUser._id
      });
  
      const savedSchool = await school.save();
      console.log('School saved successfully with ID:', savedSchool._id);
  
      // Update the user with schoolId
      savedUser.schoolId = savedSchool._id;
      await savedUser.save();
      console.log('User updated with schoolId');
  
      // Create JWT token
      const payload = {
        user: {
          id: savedUser._id,
          role: savedUser.role,
          schoolId: savedSchool._id
        }
      };
  
      jwt.sign(
        payload,
        process.env.SECRET_KEY,
        { expiresIn: config.jwtExpiration },
        (err, token) => {
          if (err) {
            console.error('JWT Error:', err);
            throw err;
          }
          console.log('JWT token generated successfully');
          res.json({ token, message: 'School registered successfully' });
        }
      );
    } catch (err) {
      // Improved error logging
      console.error('Error in registerSchool:');
      console.error(err.message);
      
      if (err.errors) {
        console.error('Validation errors:', JSON.stringify(err.errors));
      }
      
      res.status(500).json({ 
        message: 'Server error during school registration', 
        error: err.message 
      });
    }
  };

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const payload = {
      user: {
        id: user._id,
        role: user.role,
        schoolId: user.schoolId
      }
    };

    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      { expiresIn: config.jwtExpiration },
      (err, token) => {
        if (err) throw err;

        // Send token and user details in response
        res.json({
          token,
          user: {
            id: user._id,
            email: user.email,
            role: user.role,
            schoolId: user.schoolId
          }
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


// Get authenticated user
exports.getAuthUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
