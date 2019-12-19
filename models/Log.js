const mongoose = require('mongoose');
const slugify = require('slugify');

const Schema = mongoose.Schema;

const ErrorResponse = require('../utils/ErrorResponse');

const LogSchema = new Schema({
  message: {
    type: String,
    required: [true, 'Please enter a message'],
    trim: true
  },
  slug: {
    type: String,
    unique: true
  },
  tech: {
    type: Schema.Types.ObjectId,
    required: [true, 'Please select a tech']
  },
  attention: {
    type: Boolean,
    default: false
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});

LogSchema.pre('save', function() {
  this.slug = slugify(this.message, { lower: true });
});

LogSchema.post('save', function(error, doc, next) {
  if (error.code === 11000) {
    return next(new ErrorResponse('Log already exists', 400));
  }
});

module.exports = mongoose.model('Log', LogSchema);
