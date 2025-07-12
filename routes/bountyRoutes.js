const express = require('express');
const router = express.Router();
const { createBounty, getAllBounties, acceptBounty, getMyBounties } = require('../controllers/bountyController');
const { protect } = require('../middlewares/authMiddleware');


router.get('/', getAllBounties); // public routes


router.post('/', protect, createBounty); // only logged in can create

router.patch('/:id/accept', protect, acceptBounty); // accept the bounty
router.get('/mine/all', protect, getMyBounties);  // my bounties

module.exports = router;