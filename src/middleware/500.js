'use strict';

module.exports = (err, req, res, next) => {
  console.log('Server Error', err);
  let error = { error: err.message || err };
  res.status(500).json(error);
};
