const express = require('express');
const router = express.Router();

const {
  getLogs,
  getLog,
  addLog,
  updateLog,
  deleteLog
} = require('../controllers/logs');

router
  .route('/')
  .get(getLogs)
  .post(addLog);

router
  .route('/:id')
  .get(getLog)
  .put(updateLog)
  .delete(deleteLog);

module.exports = router;
