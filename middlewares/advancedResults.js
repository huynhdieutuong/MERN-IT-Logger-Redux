module.exports = (model, populate) => async (req, res, next) => {
  const { select, sort, page, limit } = req.query;
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

  // Pagination
  const pageN = parseInt(page) || 1;
  const limitN = parseInt(limit) || 10;
  const startIndex = (pageN - 1) * limitN;
  const endIndex = pageN * limitN;

  query = query.skip(startIndex).limit(limitN);

  // Populate
  if (populate) {
    query = query.populate(populate);
  }

  // Executing query
  const results = await query;

  // Pagination result
  const pagination = {};
  const total = await model.countDocuments();

  if (endIndex < total) {
    pagination.next = {
      page: pageN + 1,
      limit
    };
  }

  if (startIndex > 0) {
    pagination.pre = {
      page: pageN - 1,
      limit
    };
  }

  res.advancedResults = {
    success: true,
    count: results.length,
    data: results,
    pagination
  };

  next();
};
