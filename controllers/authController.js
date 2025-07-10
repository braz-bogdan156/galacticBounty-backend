const authService = require('../services/authService');

const registerHunter = async (req, res) => {
  try {
    const { hunter, token } = await authService.register(req.body);

    res.status(201).json({
      _id: hunter._id,
      username: hunter.username,
      email: hunter.email,
      planet: hunter.planet,
      avatar: hunter.avatar,
      role: hunter.role,
      token,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const loginHunter = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { hunter, token } = await authService.login(email, password);

    res.status(200).json({
      _id: hunter._id,
      username: hunter.username,
      email: hunter.email,
      planet: hunter.planet,
      avatar: hunter.avatar,
      role: hunter.role,
      token,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { registerHunter, loginHunter };