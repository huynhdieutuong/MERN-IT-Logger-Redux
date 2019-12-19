const ErrorResponse = require('../utils/ErrorResponse');

module.exports = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.log(err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    error = new ErrorResponse(
      `Resource not found with id of ${err.value}`,
      404
    );
  }

  // Mongoose duplicate name key
  if (err.code === 11000) {
    error = new ErrorResponse('Duplicate field value entered', 400);
  }

  // Mongoose ValidationError
  if (err.name === 'ValidationError') {
    error = new ErrorResponse(
      Object.values(err.errors).map(val => val.message),
      400
    );
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  });
};
