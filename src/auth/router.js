'use strict';

const express = require('express');
const authRouter = express.Router();

const User = require('./users-model.js');
const Role = require('./roles-model.js');
const auth = require('./middleware.js');
/**
 * Let the user create an account.
 * @param  {} '/roles'
 * @param  {} (req
 * @param  {} res
 * @param  {} next
 * @param  {} =>{letrole=newRole(req.body
 * @param  {} ;role.save(
 * @param  {} ;res.status(200
 * @param  {} .send('Savedanewroletothedb'
 * @param  {} ;}
 */
authRouter.post('/roles', (req,res,next) => {
  let role = new Role(req.body);
  role.save();
  res.status(200).send('Saved a new role to the db');
});

/**
 * Let the user access the /signin route if they have signed in already.
 * @param  {} '/signup'
 * @param  {} (req
 * @param  {} res
 * @param  {} next
 * @param  {} =>{letuser=newUser(req.body
 * @param  {} ;user.save(
 * @param  {} .then((user
 * @param  {} =>{console.log('user
 * @param  {} user
 * @param  {user._id}} ;User.findOne({_id
 */
authRouter.post('/signup', (req, res, next) => {
  let user = new User(req.body);
  user.save()
    .then( (user) => {
      console.log('user: ', user);
      User.findOne({ _id: user._id})
        .then(user => {
          req.token = user.generateToken();
          req.user = user;
          res.set('token', req.token);
          res.cookie('auth', req.token);
          res.send(req.token);
        });
    })
    .catch(next);
});
/**
 * Let the user sign in with an auth token.
 * @param  {} '/signin'
 * @param  {} auth(
 * @param  {} (req
 * @param  {} res
 * @param  {} next
 * @param  {} =>{console.log('Signedin'
 * @param  {} ;res.cookie('auth'
 * @param  {} req.token
 * @param  {} ;res.send(req.token
 * @param  {} ;}
 */
authRouter.post('/signin', auth(), (req, res, next) => {
  console.log('Signed in');
  res.cookie('auth', req.token);
  res.send(req.token);
});
/**
 * Let the user sign in with a key.
 * @param  {} '/key'
 * @param  {} auth
 * @param  {} (req
 * @param  {} res
 * @param  {} next
 * @param  {} =>{letkey=req.user.generateKey(
 * @param  {} ;res.status(200
 * @param  {} .send(key
 * @param  {} ;}
 */
authRouter.post('/key', auth, (req,res,next) => {
  let key = req.user.generateKey();
  res.status(200).send(key);
});

module.exports = authRouter;