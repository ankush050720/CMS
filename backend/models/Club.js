const mongoose = require('mongoose');

const clubSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  about: { type: String, required: true }, // Info shown in modal
  type: { type: String, required: true }, // chapter or club
  description: { type: String, required: true }, // Info shown on the club page
  executiveCommittee: {
    chairperson: { type: String, required: true },
    viceChair: { type: String, required: true },
    secretary: { type: String, required: true },
    treasurer: { type: String, required: true },
    marketingPrSecretary: { type: String, required: true },
  },
  operationalCommittee: {
    webMaster: { type: String },
    membershipChair: { type: String },
    managementHead: { type: String },
    contentCreativeHead: { type: String },
    digitalSocialMediaHead: { type: String },
  },
});

module.exports = mongoose.model('Club', clubSchema);