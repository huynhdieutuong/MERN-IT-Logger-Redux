const asyncHandler = require('../middlewares/asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');
const Log = require('../models/Log');

// @desc    Get all logs
// @route   GET /api/v1/logs
// @access  Public
exports.getLogs = asyncHandler(async (req, res, next) => {
  const logs = await Log.find();

  res.status(200).json({
    success: true,
    count: logs.length,
    data: logs
  });
});

// @desc    Get single log
// @route   GET /api/v1/logs/:id
// @access  Public
exports.getLog = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const log = await Log.findById(id);

  if (!log) {
    return next(new ErrorResponse(`Log not found with id of ${id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: log
  });
});

// @desc    Create new log
// @route   POST /api/v1/logs
// @access  Public
exports.addLog = asyncHandler(async (req, res, next) => {
  const { message, tech, attention } = req.body;

  const log = await Log.create({
    message,
    tech,
    attention
  });

  res.status(201).json({
    success: true,
    data: log
  });
});

// @desc    Update log
// @route   PUT /api/v1/Logs/:id
// @access  Public
exports.updateLog = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { message, tech, attention } = req.body;

  let log = await Log.findById(id);

  if (!log) {
    return next(new ErrorResponse(`Log not found with id of ${id}`, 404));
  }

  if (message) log.message = message;
  if (tech) log.tech = tech;
  if (attention) log.attention = attention;
  await log.save();

  res.status(200).json({
    success: true,
    data: log
  });
});

// @desc    Delete log
// @route   DELETE /api/v1/logs/:id
// @access  Public
exports.deleteLog = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const log = await Log.findById(id);

  if (!log) {
    return next(new ErrorResponse(`Log not found with id of ${id}`, 404));
  }

  await Log.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    data: {}
  });
});
