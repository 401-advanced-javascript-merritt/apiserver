'use strict';
/**
 * Find the specific model from the user's route request.
 * @param  {} request
 * @param  {} res
 * @param  {} next
 * @param  {} =>{console.log('modelfinderfunction'
 * @param  {} ;letmod=request.params.model||'books';request.model=require(`../api/models/${mod}/${mod}-model.js`
 * @param  {} ;next(
 */
module.exports = (request, res, next) => {
  console.log('model finder function');
  let mod = request.params.model || 'books';
  request.model = require(`../api/models/${mod}/${mod}-model.js`);
  next();
};
