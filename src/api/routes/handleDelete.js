'use strict';

const errorhandler = require('../../middleware/500.js');

module.exports = (request, response) => {
  let _id = request.params.id;
  request.model.delete(_id)
    .then( res => {
      response.status(200).send('Deleted.');
    })
    .catch(errorhandler);
};