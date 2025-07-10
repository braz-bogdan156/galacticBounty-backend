const express = require('express');
const router = express.Router();
const { registerHunter, loginHunter } = require('../controllers/authController');

router.post('/register', registerHunter);
router.post('/login', loginHunter);

module.exports = router;