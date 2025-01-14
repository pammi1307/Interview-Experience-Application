const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  country: {
    type: String,
    required: [true, 'Please add a country'],
  },
  company: {
    type: String,
    required: [true, 'Please add a company name'],
  },
  questions: [{
    type: String,
    required: [true, 'Please add at least one question'],
  }],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Submission', submissionSchema); 