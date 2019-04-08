'use strict';

const errorhandler = require('../../middleware/500.js');

module.exports = (request, response) => {
  request.model.put(request.params.id, request.body)
    .then(res => {
      response.status(200).send('Updated ok');
    })
    .catch(errorhandler);
};