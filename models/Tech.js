const mongoose = require('mongoose');
const slugify = require('slugify');

const ErrorResponse = require('../utils/ErrorResponse');
const UppercaseFirstLetter = require('../utils/UppercaseFirstLetter');

const Schema = mongoose.Schema;

const TechSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'Please enter first name'],
    trim: true,
    lowercase: true
  },
  lastName: {
    type: String,
    required: [true, 'Please enter last name'],
    trim: true,
    lowercase: true
  },
  fullName: String,
  slug: {
    type: String,
    unique: true
  },
  createAt: {
    type: Date,
    default: Date.now
  }
});

TechSchema.pre('save', function() {
  const fullName = `${this.firstName} ${this.lastName}`;
  this.fullName = UppercaseFirstLetter(fullName);
  this.slug = slugify(fullName);
});

TechSchema.post('save', function(error, doc, next) {
  if (error.code === 11000) {
    return next(new ErrorResponse('Tech already created', 400));
  }
});

module.exports = mongoose.model('Tech', TechSchema);
