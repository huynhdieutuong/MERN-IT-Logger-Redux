const express = require('express');
const router = express.Router();

const {
  getTechs,
  getTech,
  addTech,
  updateTech,
  deleteTech
} = require('../controllers/techs');

router
  .route('/')
  .get(getTechs)
  .post(addTech);

router
  .route('/:id')
  .get(getTech)
  .put(updateTech)
  .delete(deleteTech);

module.exports = router;
