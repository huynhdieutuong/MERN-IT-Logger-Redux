const express = require('express');
const router = express.Router();

const Tech = require('../models/Tech');
const advancedResults = require('../middlewares/advancedResults');

const {
  getTechs,
  getTech,
  addTech,
  updateTech,
  deleteTech
} = require('../controllers/techs');

router
  .route('/')
  .get(advancedResults(Tech), getTechs)
  .post(addTech);

router
  .route('/:id')
  .get(getTech)
  .put(updateTech)
  .delete(deleteTech);

module.exports = router;
