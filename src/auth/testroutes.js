'use strict';

const express = require('express');
const authRouter = express.Router();
const auth = require('./middleware.js');

authRouter.get('/public-stuff', auth(), (rec, res, next) => {
  res.status(200).send('Anyone can read this.');
});

authRouter.get('/hidden-stuff', auth(), (rec, res, next) => {
  res.status(200).send('visible on login');
});

authRouter.get('/something-to-read', auth('read'), (rec, res, next) => {
  res.status(200).send('readers can access.');
});

authRouter.get('/create-a-thing', auth('create'), (rec, res, next) => {
  res.status(200).send('admin only.');
});

authRouter.get('/update', auth('update'), (rec, res, next) => {
  res.status(200).send('admin only.');
});

authRouter.get('/jp', auth('update'), (rec, res, next) => {
  res.status(200).send('admin only.');
});

authRouter.get('/bye-bye', auth('delete'), (rec, res, next) => {
  res.status(200).send('delete only.');
});

authRouter.get('/everything', auth('superuser'), (rec, res, next) => {
  res.status(200).send('superuser only.');
});

module.exports = authRouter;