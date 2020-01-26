const Log = require('../models/Log');
const Tech = require('../models/Tech');

module.exports = (model, populate) => async (req, res, next) => {
  const { select, sort, page, limit, q } = req.query;
  let query = model.find();

  // Select Fields
  if (select) {
    query = query.select(select.split(',').join(' '));
  }

  // Sort
  if (sort) {
    query = query.sort(sort);
  } else {
    query = query.sort('-createAt');
  }

  // Populate
  if (populate) {
    query = query.populate(populate);
  }

  // Executing query
  let results = await query;

  // Search
  if (q) {
    const regex = new RegExp(q, 'gi');

    if (model === Log) {
      results = results.filter(
        res => res.message.match(regex) || res.tech.fullName.match(regex)
      );
    }

    if (model === Tech) {
      results = results.filter(res => res.fullName.match(regex));
    }
  }

  // Pagination
  const pageN = parseInt(page) || 1;
  const limitN = parseInt(limit) || 10;
  const startIndex = (pageN - 1) * limitN;
  const endIndex = pageN * limitN;
  const total = results.length;

  results = results.slice(startIndex, endIndex);

  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: pageN + 1
    };
  }

  if (startIndex > 0) {
    pagination.pre = {
      page: pageN - 1
    };
  }

  // Page Numbers
  let pageNumbers = [];
  for (let i = 1; i <= Math.ceil(total / limitN); i++) {
    pageNumbers.push(i);
  }
  pagination.pageNumbers = pageNumbers;

  res.advancedResults = {
    success: true,
    count: results.length,
    data: results,
    pagination
  };

  next();
};
