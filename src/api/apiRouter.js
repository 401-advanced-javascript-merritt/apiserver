'use strict';

const modelFinder = require(`../middleware/model-finder.js`);
const express = require('express');
const apiRouter = express.Router();
const auth = require('../auth/middleware.js');
const errorhandler = require('../middleware/500.js');

const handleGetAll = require('./routes/handleGetAll.js');

apiRouter.use(modelFinder);

apiRouter.get('api/v1/:model/', handleGetAll);
apiRouter.get('api/v1/:model/:id', auth(),  handleGetOne);
apiRouter.post('api/v1/:model', auth('creator'), handleCreate);
apiRouter.put('api/v1/:model/:id', auth('editor'), handleUpdate);
apiRouter.delete('api/v1/:model/:id', auth('admin'), handleDelete);

// function handleGetAll(request, response) {
//   console.log('get all function');
//   request.model.get()
//     .then(result => {
//       response.status(200).send('Get all');
//     })
//     .catch(errorhandler);
// }

function handleGetOne(request, response){
  let id = [request.params.id];
  request.model.get(id)
    .then(res => {
      response.status(200).sent('Got one');
    })
    .catch(errorhandler);
}

function handleCreate(request, response) {
  request.model.post(request.body)
    .then(res => {
      response.status(200).send('Created ok');
    })
    .catch(errorhandler);
}

function handleUpdate(request, response){
  request.model.put(request.params.id, request.body)
    .then(res => {
      response.status(200).send('Updated ok');
    })
    .catch(errorhandler);
}

function handleDelete(request, response){
  let _id = request.params.id;
  request.model.delete(_id)
    .then( res => {
      response.status(200).send('Deleted.');
    })
    .catch(errorhandler);
}

module.exports = apiRouter;