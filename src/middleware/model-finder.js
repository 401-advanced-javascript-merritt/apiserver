'use strict';

module.exports = (request, res, next) => {
  console.log('model finder function');
  let mod = request.params.model || 'books';
  request.model = require(`../api/models/${mod}/${mod}-model.js`);
  next();
};
