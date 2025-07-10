const Hunter = require('../models/hunter');

const getAllHuntersWithBounties = async () => {
  return await Hunter.find()
    .select('-password')
    .populate('acceptedBounties', 'title reward planet');
};

module.exports = { getAllHuntersWithBounties };