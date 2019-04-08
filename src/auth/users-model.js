'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET;
const SINGLE_USE_TOKENS = !!process.env.SINGLE_USE_TOKENS;
const TOKEN_EXPIRE = process.env.TOKEN_LIFETIME || '5m';

const usedTokens = new Set();

const users = new mongoose.Schema({
  username: {type:String, required: true, unique: true},
  password: {type:String, required: true},
  role: { type: String, default:'user', enum: ['admin', 'editor', 'user']},
});

const capabilities = {
  admin: ['create','read','update','delete'],
  editor: ['create', 'read', 'update'],
  user: ['read'],
};

users.virtual('capabilities', {
  ref: 'roles', 
  localField: 'role', 
  foreignField: 'role',
});
/**
 * Before a user is 'found' from the database, populate the capabilities virtual.
 * @param  {} 'find'
 * @param  {} function(next
 * @param  {} {try{this.$where.populate('capabilities'
 * @param  {} ;}catch(e
 * @param  {} {console.error;}}
 */
users.pre('find', function(next) {
  try {
    this.$where.populate('capabilities');
  }
  catch(e){console.error; }
});
/**
 * Before a user is 'saved', hash the password.
 * @param  {} 'save'
 * @param  {} function(next
 * @param  {} {bcrypt.hash(this.password
 * @param  {} 10
 * @param  {} .then(hashedPassword=>{this.password=hashedPassword;next(
 * @param  {} ;}
 * @param  {} .catch(error=>{thrownewError(error
 * @param  {} ;}
 * @param  {} ;}
 */
users.pre('save', function(next) {
  bcrypt.hash(this.password, 10)
    .then(hashedPassword => {
      this.password = hashedPassword;
      next();
    })
    .catch(error => {throw new Error(error);});
});
/**
 * Check the user's token.
 * @param  {} token
 * @param  {} {if(usedTokens.has(token
 * @param  {} {returnPromise.reject('InvalidToken'
 * @param  {} ;}try{letparsedToken=jwt.verify(token
 * @param  {} SECRET
 * @param  {} ;(SINGLE_USE_TOKENS
 * @param  {} &&parsedToken.type!=='key'&&usedTokens.add(token
 * @param  {parsedToken.id};returnthis.findOne(query} ;letquery={_id
 */
users.statics.authenticateToken = function(token) {
  
  if ( usedTokens.has(token ) ) {
    return Promise.reject('Invalid Token');
  }
  
  try {
    let parsedToken = jwt.verify(token, SECRET);
    (SINGLE_USE_TOKENS) && parsedToken.type !== 'key' && usedTokens.add(token);
    let query = {_id: parsedToken.id};
    return this.findOne(query);
  } catch(e) { throw new Error('Invalid Token'); }
  
};
/**
 * Check the user's login info
 * @param  {} auth
 * @param  {auth.username};returnthis.findOne(query} {letquery={username
 */
users.statics.authenticateBasic = function(auth) {
  let query = {username:auth.username};
  return this.findOne(query)
    .then( user => user && user.comparePassword(auth.password) )
    .catch(error => {throw error;});
};
/**
 * Compare the passwords.
 * @param  {} password
 * @param  {} {returnbcrypt.compare(password
 * @param  {} this.password
 * @param  {null} .then(valid=>valid?this
 */
users.methods.comparePassword = function(password) {
  return bcrypt.compare( password, this.password )
    .then( valid => valid ? this : null);
};
/**
 * Generate a new token.
 * @param  {} type
 * @param  {this._id} {lettoken={id
 * @param  {this.capabilities} capabilities
 * @param  {type||'user'} type
 * @param  {} };letoptions={};if(type!=='key'&&!!TOKEN_EXPIRE
 * @param  {TOKEN_EXPIRE};}returnjwt.sign(token} {options={expiresIn
 * @param  {} SECRET
 * @param  {} options
 */
users.methods.generateToken = function(type) {
  
  let token = {
    id: this._id,
    capabilities: this.capabilities,  //log this first
    type: type || 'user',
  };
  
  let options = {};
  if ( type !== 'key' && !! TOKEN_EXPIRE ) { 
    options = { expiresIn: TOKEN_EXPIRE };
  }
  
  return jwt.sign(token, SECRET, options);
};
/**
 * check if the user has specified capabilities.
 * @param  {} capability
 * @param  {} {returncapabilities[this.role].includes(capability
 */
users.methods.can = function(capability) {
  return capabilities[this.role].includes(capability);
};
/**
 * Generate a key.
 * @param  {} {returnthis.generateToken('key'
 */
users.methods.generateKey = function() {
  return this.generateToken('key');
};

module.exports = mongoose.model('users', users);