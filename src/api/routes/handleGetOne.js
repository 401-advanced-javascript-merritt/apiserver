'use strict';
const errorhandler = require('../../middleware/500.js');


module.exports = (request, response) => {
  let id = [request.params.id];
  request.model.get(id)
    .then(res => {
      response.status(200).sent('Got one');
    })
    .catch(errorhandler);
};