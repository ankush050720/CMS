// models/Propose.js
const mongoose = require('mongoose');

const ProposeSchema = new mongoose.Schema({
  organizingBody: String,
  status: {
    type: String,
    default:'Pending'
  },
  eventName: String,
  eventDate: Date,
  eventTime: String,
  purpose: String,
  preferredVenue: String,
  proposalInitiator: String,
  collaborations: String,
  sponsors: String,
  description: String,
  targetAudience: String,
  expectedParticipation: String,
  assistanceNeeded: String,
  equipmentMaterials: [
    {
      description: String,
      quantity: Number,
      unitPrice: Number,
    },
  ],
  equipmentJustification: String,
  travelExpenses: [
    {
      description: String,
      totalCost: Number,
    },
  ],
  travelJustification: String,
  equipmentTotal: Number,
  travelTotal: Number,
  grandTotal: Number,
  comment: String,
  club: { type: mongoose.Schema.Types.ObjectId, ref: 'Club', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Propose', ProposeSchema);