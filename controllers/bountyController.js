const bountyService = require('../services/bountyService');

const createBounty = async (req, res) => {
  try {
    const bounty = await bountyService.createBounty(req.body, req.user._id);
    res.status(201).json(bounty);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllBounties = async (req, res) => {
  try {
    const bounties = await bountyService.getAllBounties(req.query);
    res.json(bounties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const acceptBounty = async (req, res) => {
  try {
    const bounty = await bountyService.acceptBounty(req.params.id, req.user);
    res.json({ message: 'Bounty accepted successfully', bounty });
  } catch (err) {
    res.status(400).json({ message: err.message }); // bad request
  }
};

const unacceptBounty = async (req, res) => {
  try {
    const bounty = await bountyService.unacceptBounty(req.params.id, req.user);
    res.json({ message: 'Bounty unaccepted successfully', bounty });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getMyBounties = async (req, res) => {
  try {
    const result = await bountyService.getMyBounties(req.user._id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createBounty,
  getAllBounties,
  acceptBounty,
  getMyBounties,
  unacceptBounty,
};
