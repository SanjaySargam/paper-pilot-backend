const School = require('../models/School');

// Get school details
exports.getSchool = async (req, res) => {
  try {
    const school = await School.findById(req.user.schoolId);
    
    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }

    res.json(school);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update school details
exports.updateSchool = async (req, res) => {
  const { schoolName, address } = req.body;

  try {
    let school = await School.findById(req.user.schoolId);
    
    if (!school) {
      return res.status(404).json({ message: 'School not found' });
    }

    // Update fields
    if (schoolName) school.schoolName = schoolName;
    if (address) school.address = address;

    await school.save();

    res.json(school);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
