![CF](http://i.imgur.com/7v5ASc8.png) LAB
=================================================

[![Build Status](https://www.travis-ci.com/401-advanced-javascript-merritt/apiserver.svg?branch=master)](https://www.travis-ci.com/401-advanced-javascript-merritt/apiserver)

## Weekend Lab: API Server
### Chris Merritt
### Links and Resources
* [PR](https://github.com/401-advanced-javascript-merritt/apiserver/pull/1)

* [back-end](https://merritt-api-server.herokuapp.com/)


#### Documentation
* [swagger](https://merritt-api-server.herokuapp.com/api/docs)
* [jsdoc](https://merritt-api-server.herokuapp.com/docs)


### Modules
* Mongo Model:
  Creates a basic template for models so they can be added to the mongo database.

* Book Model/Schema:
  Basic schema/model used to test the routes. Adds the users requests to the database.

* API Router:
  Allow the user to create, read, update, delete according to the model passed into the request. Once the model has been found, it directs the request to the specified model.

* Auth Middleware: 
  When a route is hit that needs authentication, this file is run. The user's credentials & capabilities are checked. Login info, tokens, keys, and capabilities.

* Roles Model:
  Creates the blueprint for the roles model. Lets the user have certain capabilities.

* Users Model:
  The blueprint to create a new user & validate that they are logged in. Can set the capabilities of the user, then add them to the database. Creates & checks hashed passwords and tokens.

* Auth Router:
  Lets the user hit the /signin and /signup routes. Creates new values with the givven login information.

* Middleware:
  * 404.js:
    Returns a 404 if the user hits a route that doesnt exist.

  * 500.js:
    Return a 500 status if the server throws an error.

  * Model Finder: 
    Finds the matching files according to the route params and seths the request model to match that model.


### Setup
#### `.env` requirements
* `npm i`
* `PORT` - 3000
* `MONGODB_URI` - URL to the running mongo instance/db
#### Running the app
* `npm start`
* Endpoint: `/signin` POST
 * Used to create a new user. Must have a username and password. Returns token.
* Endpoint: `/signup` POST
  * Used to log in to existing account. Must have login info or token. Returns token.
* Endpoint: `/api/v1/:model` GET
  * Used to get all values from the model.
* Endpoint: `/api/v1/:model/:id` GET
  * Used to get one value of the model
* Endpoint: `/api/v1/:model/` POST
  * Used to create a new instance of the model
* Endpoint: `/api/v1/:model/:id` PUT
  * Used to update a given value of the model.
* Endpoint: `/api/v1/:model/:id` DELETE
  * Used to delete a given value of the model.

#### Tests
* How do you run tests?
  * `npm run test`
  * `npm run lint`
