'use strict';
/**
 * If the user reaches a route that doesnt exist, throw an error.
 * @param  {} req
 * @param  {} res
 * @param  {} next
 * @param  {};res.status(404} =>{leterror={error
 */
module.exports = (req, res, next) => {
  let error = {error: 'Resource Not Found' };
  res.status(404).json(error);
};
