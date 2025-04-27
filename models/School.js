const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schoolSchema = new mongoose.Schema(
  {
    schoolName: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);

// Hash the password before saving it to the database
schoolSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

// Compare the given password with the hashed password in the database
schoolSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const School = mongoose.model('School', schoolSchema);

module.exports = School;
