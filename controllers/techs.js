const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');
const Tech = require('../models/Tech');

// @desc    Get all techs
// @route   GET /api/v1/techs
// @access  Public
exports.getTechs = asyncHandler(async (req, res, next) => {
  const techs = await Tech.find();

  res.status(200).json({
    success: true,
    count: techs.length,
    data: techs
  });
});

// @desc    Get single tech
// @route   GET /api/v1/techs/:id
// @access  Public
exports.getTech = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const tech = await Tech.findById(id);

  if (!tech) {
    return next(new ErrorResponse(`Tech not found with id of ${id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: tech
  });
});

// @desc    Create new tech
// @route   POST /api/v1/techs
// @access  Public
exports.addTech = asyncHandler(async (req, res, next) => {
  const { firstName, lastName } = req.body;

  const tech = await Tech.create({
    firstName,
    lastName
  });

  res.status(201).json({
    success: true,
    data: tech
  });
});

// @desc    Update tech
// @route   PUT /api/v1/techs/:id
// @access  Public
exports.updateTech = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { firstName, lastName } = req.body;

  let tech = await Tech.findById(id);

  if (!tech) {
    return next(new ErrorResponse(`Tech not found with id of ${id}`, 404));
  }

  if (firstName) tech.firstName = firstName;
  if (lastName) tech.lastName = lastName;
  await tech.save();

  res.status(200).json({
    success: true,
    data: tech
  });
});

// @desc    Delete tech
// @route   DELETE /api/v1/techs/:id
// @access  Public
exports.deleteTech = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const tech = await Tech.findById(id);

  if (!tech) {
    return next(new ErrorResponse(`Tech not found with id of ${id}`, 404));
  }

  await Tech.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    data: {}
  });
});
