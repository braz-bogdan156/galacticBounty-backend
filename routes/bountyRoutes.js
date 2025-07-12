const express = require('express');
const router = express.Router();
const { createBounty, getAllBounties, acceptBounty, unacceptBounty, getMyBounties } = require('../controllers/bountyController');
const { protect } = require('../middlewares/authMiddleware');


router.get('/', getAllBounties); // public routes


router.post('/', protect, createBounty); // only logged in can create

router.patch('/:id/accept', protect, acceptBounty); // accept the bounty
router.patch('/:id/unaccept', protect, unacceptBounty); // unaccept the bounty
router.get('/mine/all', protect, getMyBounties);  // my bounties

module.exports = router;