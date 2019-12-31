const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');

module.exports = (model, populate) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    let query = model.findById(id);

    // Populate
    if (populate) {
      query = query.populate(populate);
    }

    // Executing result
    const result = await query;

    // Check if not result
    if (!result) {
      return next(
        new ErrorResponse(`Resource not found with id of ${id}`, 404)
      );
    }

    res.result = result;

    next();
  });
