const express = require('express');
const router = express.Router();

const Log = require('../models/Log');
const advancedResults = require('../middlewares/advancedResults');

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
  .get(getLog)
  .put(updateLog)
  .delete(deleteLog);

module.exports = router;
