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
    ref: 'Tech',
    required: [true, 'Please select a tech']
  },
  attention: {
    type: Boolean,
    default: false
  },
  body: {
    type: String,
    default:
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'
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
