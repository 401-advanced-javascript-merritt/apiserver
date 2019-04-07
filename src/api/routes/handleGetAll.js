'use strict';
require('dotenv').config();

const errorHandler = require('../../middleware/500.js');

module.exports = (request, response) => {
  console.log('inside get all function.');
  request.model.get()
    .then(results => {
      console.log('got results', results);
    })
    .catch(errorHandler);
};
