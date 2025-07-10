const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const HunterSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  avatar: {
    type: String,
    default: '', 
  },
  planet: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ['hunter', 'admin'],
    default: 'hunter',
  },
  acceptedBounties: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bounty',
    }
  ],
  postedBounties: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bounty',
    }
  ],
}, {
  timestamps: true,
});


HunterSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


HunterSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Hunter', HunterSchema);