'use strict';

const MongoModel = require('../mongo-models.js');
const schema = require('./book-schema.js');

class Books extends MongoModel {}

const books = new Books(schema);

module.exports = books;