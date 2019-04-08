'use strict';

const errorhandler = require('../../middleware/500.js');

module.exports = (request, response) => {
  request.model.post(request.body)
    .then(res => {
      response.status(200).send('Created ok');
    })
    .catch(errorhandler);
};