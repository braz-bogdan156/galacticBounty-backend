const mongoose = require('mongoose');

const BountySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    targetName: {
      type: String,
      required: true,
    },
    planet: {
      type: String,
      required: true,
    },
    reward: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      default: '',
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hunter',
    },
    acceptedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Hunter',
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Bounty', BountySchema);