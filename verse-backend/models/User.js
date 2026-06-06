const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your full name as it appears on your school records']
  },
  email: {
    type: String,
    required: [true, 'Your email address'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Enter passwerd'],
    minLength: 8,
    select: false
  },
  matricNumber: {
    type: String,
    required: [true, 'Your matriculation number is required'],
    unique: true,
    trum: true
  },
  faculty: {
    type: String,
    required: [true, 'Select your faculty']
  },
  department: {
    type: String,
    required: [true, 'Select your department']
  },
  verificationRecieptUrl: {
    type: String,
    required: [true, 'An upload of your e-campus school fee reciept is required to verify that you are a student of RSU']
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('save', async function(next) {
  if(!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
})

userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword)
};

module.exports = mongoose.model('User', userSchema)