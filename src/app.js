'use strict';

const express = require('express');
const cors = require('cors');

const notfound = require('./middleware/404.js');
const errorhandler = require('./middleware/500.js');
const authRouter = require('./auth/router.js');
const apiRoutes = require('./api/apiRouter.js');
// const modelfinder = require('./middleware/model-finder.js');

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/docs', express.static('docs'));

// app.use(modelfinder);

//routes: need one to handle auth, user login & creation. Need another to handle the api?
app.use(authRouter);
app.use(apiRoutes);

//error handling
app.use(notfound);
app.use(errorhandler);

/**
 * Starts the Server
 * @param  {} port
 * @param  {} =>{app.listen(port
 * @param  {} (
 * @param  {} =>{console.log(`Listeningonport${port}`
 * @param  {} ;}
 * @param  {} ;}
 */
module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  },
};