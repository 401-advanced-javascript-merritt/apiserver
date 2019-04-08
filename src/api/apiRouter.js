'use strict';

const modelFinder = require(`../middleware/model-finder.js`);
const express = require('express');
const apiRouter = express.Router();
const swagger = require('swagger-ui-express');
const swaggerDocs = require('../../docs/config/swagger.json');


const auth = require('../auth/middleware.js');
// const errorhandler = require('../middleware/500.js');

const handleGetAll = require('./routes/handleGetAll.js');
const handleGetOne = require('./routes/handleGetOne.js');
const handleCreate = require('./routes/handleCreate.js');
const handleUpdate = require('./routes/handleUpdate.js');
const handleDelete = require('./routes/handleDelete.js');

apiRouter.use('/api/docs', swagger.serve , swagger.setup(swaggerDocs));


// apiRouter.use(modelFinder);
apiRouter.param('model', modelFinder);

// apiRouter.get('api/v1/books/', handleGetAll);
// apiRouter.get('api/v1/books/:id', auth(),  handleGetOne);
// apiRouter.post('api/v1/books', auth('creator'), handleCreate());
// apiRouter.put('api/v1/books/:id', auth('editor'), handleUpdate());
// apiRouter.delete('api/v1/books/:id', auth('admin'), handleDelete());


apiRouter.get('/api/:model/', auth(), handleGetAll);
apiRouter.get('/api/:model/:id', auth(),  handleGetOne);
apiRouter.post('/api/:model', auth('create'), handleCreate);
apiRouter.put('/api/:model/:id', auth('update'), handleUpdate);
apiRouter.delete('/api/:model/:id', auth('delete'), handleDelete);

// function handleGetAll(request, response) {
//   console.log('get all function');
//   request.model.get()
//     .then(result => {
//       response.status(200).send('Get all');
//     })
//     .catch(errorhandler);
// }
/**
 * Given the model, find the matching values from the database.
 * @param  {} request
 * @param  {} response
 * @param  {} {letid=[request.params.id];request.model.get(id
 * @param  {} .then(res=>{response.status(200
 * @param  {} .sent('Gotone'
 * @param  {} ;}
 * @param  {} .catch(errorhandler
 */
// function handleGetOne(request, response){
//   let id = [request.params.id];
//   request.model.get(id)
//     .then(res => {
//       response.status(200).sent('Got one');
//     })
//     .catch(errorhandler);
// }
// /**
//  * Create a record in the database given the matching model.
//  * @param  {} request
//  * @param  {} response
//  * @param  {} {request.model.post(request.body
//  * @param  {} .then(res=>{response.status(200
//  * @param  {} .send('Createdok'
//  * @param  {} ;}
//  * @param  {} .catch(errorhandler
//  */
// function handleCreate(request, response) {
//   request.model.post(request.body)
//     .then(res => {
//       response.status(200).send('Created ok');
//     })
//     .catch(errorhandler);
// }
// /**
//  * Given the matching model, update an existing value in the database.
//  * @param  {} request
//  * @param  {} response
//  * @param  {} {request.model.put(request.params.id
//  * @param  {} request.body
//  * @param  {} .then(res=>{response.status(200
//  * @param  {} .send('Updatedok'
//  * @param  {} ;}
//  * @param  {} .catch(errorhandler
//  */
// function handleUpdate(request, response){
//   request.model.put(request.params.id, request.body)
//     .then(res => {
//       response.status(200).send('Updated ok');
//     })
//     .catch(errorhandler);
// }
// /**
//  * Given a matching model, delete a value from the database.
//  * @param  {} request
//  * @param  {} response
//  * @param  {} {let_id=request.params.id;request.model.delete(_id
//  * @param  {} .then(res=>{response.status(200
//  * @param  {} .send('Deleted.'
//  * @param  {} ;}
//  * @param  {} .catch(errorhandler
//  */
// function handleDelete(request, response){
//   let _id = request.params.id;
//   request.model.delete(_id)
//     .then( res => {
//       response.status(200).send('Deleted.');
//     })
//     .catch(errorhandler);
// }

module.exports = apiRouter;