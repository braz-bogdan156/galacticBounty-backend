const express = require("express");
const router = express.Router();
const authRoutes = require("./authRoutes");
const adminRoutes = require('./adminRoutes');
const bountyRoutes = require('./bountyRoutes');
 
router.use("/auth", authRoutes);
router.use('/admin', adminRoutes);
router.use('/bounties', bountyRoutes);

module.exports = router;


