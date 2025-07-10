const Hunter = require('../models/hunter');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const register = async (hunterData) => {
  const { email } = hunterData;

  const existingHunter = await Hunter.findOne({ email });
  if (existingHunter) {
    throw new Error('Hunter already exists');
  }

  const hunter = await Hunter.create(hunterData);
  const token = generateToken(hunter._id);

  return { hunter, token };
};

const login = async (email, password) => {
  const hunter = await Hunter.findOne({ email });
  if (!hunter || !(await hunter.matchPassword(password))) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken(hunter._id);
  return { hunter, token };
};

module.exports = { register, login };