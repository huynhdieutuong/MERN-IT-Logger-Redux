const asyncHandler = require('../middlewares/asyncHandler');
const Log = require('../models/Log');

// @desc    Get all logs
// @route   GET /api/v1/logs
// @access  Public
exports.getLogs = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Get single log
// @route   GET /api/v1/logs/:id
// @access  Public
exports.getLog = asyncHandler(async (req, res, next) => {
  const log = res.result;

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

  let log = await Log.create({
    message,
    tech,
    attention
  });

  log = await Log.findById(log._id).populate({
    path: 'tech',
    select: 'fullName slug'
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
  const { message, tech, attention } = req.body;

  let log = res.result;

  if (message) log.message = message;
  if (tech) log.tech = tech;
  if (attention) log.attention = attention;
  log = await log.save();

  res.status(200).json({
    success: true,
    data: log
  });
});

// @desc    Delete log
// @route   DELETE /api/v1/logs/:id
// @access  Public
exports.deleteLog = asyncHandler(async (req, res, next) => {
  const log = res.result;

  await Log.findByIdAndDelete(log._id);

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Searhc logs
// @route   GET /api/v1/logs/search?q=text
// @access  Public
exports.searchLogs = asyncHandler(async (req, res, next) => {
  const text = req.query.q;
  const regex = new RegExp(text, 'gi');

  const { data } = res.advancedResults;

  const results = data.filter(
    res => res.message.match(regex) || res.tech.fullName.match(regex)
  );

  res.status(200).json({
    success: true,
    count: results.length,
    data: results
  });
});
