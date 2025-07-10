const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const adminOnly = require('../middlewares/adminOnly');
const { getAllHuntersWithAcceptedBounties } = require('../controllers/adminController');

router.get('/hunters', protect, adminOnly, getAllHuntersWithAcceptedBounties);

module.exports = router;