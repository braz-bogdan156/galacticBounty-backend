const Bounty = require('../models/bounty');

exports.createBounty = async (bountyData, userId) => {
  try {
    const bounty = await Bounty.create({
      ...bountyData,
      postedBy: userId,
    });
    return bounty;
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getAllBounties = async (filters = {}) => {
  const query = {};
  if (filters.planet) query.planet = filters.planet;
  if (filters.status === 'accepted') query.acceptedBy = { $ne: null };
  if (filters.status === 'open') query.acceptedBy = null;

  return await Bounty.find(query)
    .populate('postedBy', 'username planet avatar')
    .populate('acceptedBy', 'username')
    .lean()
    .then(bounties =>
      bounties.map(b => ({
        ...b,
        status: b.acceptedBy ? 'accepted' : 'open',
      }))
    );
};

exports.acceptBounty = async (bountyId, user) => {
  const bounty = await Bounty.findById(bountyId);
  if (!bounty) throw new Error('Bounty not found');
  if (bounty.acceptedBy) throw new Error('Bounty already accepted');

  bounty.acceptedBy = user._id;
  await bounty.save();

  user.acceptedBounties.push(bounty._id);
  await user.save();

  return bounty;
};
exports.unacceptBounty = async (bountyId, user) => {
  const bounty = await Bounty.findById(bountyId);
  if (!bounty) throw new Error('Bounty not found');

  if (!bounty.acceptedBy || bounty.acceptedBy.toString() !== user._id.toString()) {
    throw new Error('You cannot unaccept this bounty');
  }

  bounty.acceptedBy = null;
  await bounty.save();

  user.acceptedBounties = user.acceptedBounties.filter(
    id => id.toString() !== bountyId
  );
  await user.save();

  return bounty;
};

exports.getMyBounties = async (userId) => {
  const accepted = await Bounty.find({ acceptedBy: userId });
  const posted = await Bounty.find({ postedBy: userId });
  return { accepted, posted };
  };