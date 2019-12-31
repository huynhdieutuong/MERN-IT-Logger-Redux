const express = require('express');
const router = express.Router();

const Log = require('../models/Log');
const advancedResults = require('../middlewares/advancedResults');
const findById = require('../middlewares/findById');

const {
  getLogs,
  getLog,
  addLog,
  updateLog,
  deleteLog
} = require('../controllers/logs');

router
  .route('/')
  .get(
    advancedResults(Log, {
      path: 'tech',
      select: 'fullName slug'
    }),
    getLogs
  )
  .post(addLog);

router
  .route('/:id')
  .get(
    findById(Log, {
      path: 'tech',
      select: 'fullName slug'
    }),
    getLog
  )
  .put(
    findById(Log, {
      path: 'tech',
      select: 'fullName slug'
    }),
    updateLog
  )
  .delete(findById(Log), deleteLog);

module.exports = router;
