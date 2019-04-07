'use strict';

const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);


const books = mongoose.Schema({
  title: {type:String, required: true},
  author: { type:String, required: true},
  description: {type: String, required: false},
});

module.exports = mongoose.model('books', books);