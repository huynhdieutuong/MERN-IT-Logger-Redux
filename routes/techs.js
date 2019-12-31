const express = require('express');
const router = express.Router();

const Tech = require('../models/Tech');
const advancedResults = require('../middlewares/advancedResults');
const findById = require('../middlewares/findById');

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
  .get(findById(Tech), getTech)
  .put(findById(Tech), updateTech)
  .delete(findById(Tech), deleteTech);

module.exports = router;
