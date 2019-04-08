'use strict'; 

const User = require('./users-model.js');

module.exports = (capability) => {
  return (req, res, next) => {
    try {
      let [authType, authString] = req.headers.authorization.split(/\s+/);

      switch (authType.toLowerCase()) {
      case 'basic':
        return _authBasic(authString);
      case 'bearer':
        return _authBearer(authString);
      default:
        return _authError();
      }
    } catch (e) {
      _authError();
    }
    /**
     * Authenticate a user given the username and password.
     * @param  {} str
     * @param  {} {letbase64Buffer=Buffer.from(str
     * @param  {} 'base64'
     * @param  {} ;letbufferString=base64Buffer.toString(
     * @param  {} ;let[username
     * @param  {} password]=bufferString.split('
     */
    function _authBasic(str) {
      let base64Buffer = Buffer.from(str, 'base64'); 
      let bufferString = base64Buffer.toString(); 
      let [username, password] = bufferString.split(':'); 
      let auth = {username, password}; 
  
      return User.authenticateBasic(auth)
        .then(user => _authenticate(user))
        .catch(_authError);
    }
    /**
     * Authenticate a user given a token.
     * @param  {} authString
     * @param  {} {returnUser.authenticateToken(authString
     * @param  {} .then(user=>_authenticate(user
     * @param  {} .catch(_authError
     */
    function _authBearer(authString) {
      return User.authenticateToken(authString)
        .then(user => _authenticate(user))
        .catch(_authError);
    }
  
    /**
     * Check that the user is authenticated.
     * @param  {} user
     * @param  {} {if(user&&(!capability||(user.can(capability
     * @param  {} {req.user=user;req.token=user.generateToken(
     * @param  {} ;next(
     * @param  {} ;}else{_authError(
     */
    function _authenticate(user) {
      if ( user && (!capability || (user.can(capability))) ) {
        req.user = user;
        req.token = user.generateToken();
        next();
      }
      else {
        _authError();
      }
    }
  
    /**
     * Check for errors.
     * @param  {} {next('InvalidUserID/Password'
     */
    function _authError() {
      next('Invalid User ID/Password');
    }


  };
};
