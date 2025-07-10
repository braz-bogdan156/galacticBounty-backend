const Hunter = require('../models/hunter');
const Bounty = require('../models/bounty');

const getAllHuntersWithAcceptedBounties = async (req, res) => {
  try {
    const hunters = await Hunter.find()
      .select('-password') // hide the password
      .populate('acceptedBounties', 'title reward planet'); // only needed fields

    res.status(200).json(hunters);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  getAllHuntersWithAcceptedBounties,
};