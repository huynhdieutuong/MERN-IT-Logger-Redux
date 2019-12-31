const asyncHandler = require('../middlewares/asyncHandler');
const Tech = require('../models/Tech');

// @desc    Get all techs
// @route   GET /api/v1/techs
// @access  Public
exports.getTechs = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single tech
// @route   GET /api/v1/techs/:id
// @access  Public
exports.getTech = asyncHandler(async (req, res, next) => {
  const tech = res.result;

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
  const { firstName, lastName } = req.body;

  let tech = res.result;

  if (firstName) tech.firstName = firstName;
  if (lastName) tech.lastName = lastName;
  tech = await tech.save();

  res.status(200).json({
    success: true,
    data: tech
  });
});

// @desc    Delete tech
// @route   DELETE /api/v1/techs/:id
// @access  Public
exports.deleteTech = asyncHandler(async (req, res, next) => {
  const tech = res.result;

  await Tech.findByIdAndDelete(tech._id);

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Searhc techs
// @route   GET /api/v1/techs/search?q=name
// @access  Public
exports.searchTechs = asyncHandler(async (req, res, next) => {
  const name = req.query.q;
  const regex = new RegExp(name, 'gi');

  const { data } = res.advancedResults;

  const results = data.filter(res => res.fullName.match(regex));

  res.status(200).json({
    success: true,
    count: results.length,
    data: results
  });
});
