const mongoose = require('mongoose');

const EmailSchema = new mongoose.Schema({
  subject: { type: String },
  body: { type: String },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receivers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  status: { type: String, enum: ['sent', 'draft'], default: 'draft' },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Email', EmailSchema);
