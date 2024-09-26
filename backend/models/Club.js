const mongoose = require('mongoose');

// Schema for club members
const memberSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  enrollmentId: { type: String },
  position: { type: String },
  photo: { type: String }, // Drive link or URL for photo
}, { _id: false }); // _id: false will prevent creating a separate _id for each member

// Schema for club events
const eventSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Automatically generate an ID
  date: { type: Date },
  eventName: { type: String },
  internalExternal: { type: String }, // Either 'internal' or 'external'
  nationalInternational: { type: String }, // Either 'national' or 'international'
});

// Main club schema
const clubSchema = new mongoose.Schema({
  name: { type: String },
  facultyCoordinator: { type: String },
  studentChair: { type: String },
  studentCoChair: { type: String },
  officialMembers: { type: Number },
  clubLogo: { type: String }, // URL or Base64 if you store it directly
  clubWebsite: { type: String },
  clubEmail: { type: String },
  instagramHandle: { type: String },
  linkedinHandle: { type: String },
  facebookHandle: { type: String },
  twitterHandle: { type: String },
  officialPics: { type: [String] }, // Array of images or image URLs
  chapterBrief: { type: String },
  mission: { type: String },
  vision: { type: String },
  addMembers: { type: [memberSchema] }, // Array of members based on memberSchema
  events: { type: [eventSchema] }, // Array of events based on eventSchema
  type: { type: String, enum: ['club', 'chapter'] }, // Single choice
  tentativeDate: { type: Date } // Date field
}, { timestamps: true });

const Club = mongoose.model('Club', clubSchema);
module.exports = Club;