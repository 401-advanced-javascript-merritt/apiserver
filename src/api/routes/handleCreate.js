'use strict';

const errorhandler = require('../../middleware/500.js');

module.exports = (request, response) => {
  console.log(request.query);
  request.model.post(request.query)
    .then(res => {
      response.status(200).send(res);
    })
    .catch(errorhandler);
};