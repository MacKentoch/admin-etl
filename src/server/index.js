/* eslint no-console:0 */
/* eslint no-process-env:0 */

'use strict';

const express     = require('express');
const bodyParser  = require('body-parser');
const helmet      = require('helmet');
const morgan      = require('morgan');
const routes      = require('./routes');
const config      = require('./config');

const app = express();

app.use(helmet()); // ensure app security (by default since just intranet web site here)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// if (process.env && process.env.NODE_ENV && process.env.NODE_ENV !== 'production') {
app.use(morgan('combined')); // logs
// }

app.use(express.static(config.staticsPath)); // static assets

/** ========================================================
 *    ROUTES
 ======================================================== */
app.use('/api/test', routes.api.test);

/* ======================================================= */

// SPA index html file:
app.use('*', routes.home);


app.set('port', config.port);
app.set('ipAdress', config.apiAdress);

// launch server:
app.listen(
  app.get('port'),
  app.get('ipAdress'),
  'localhost',
  () => console.log(
    'Production server running on  %s:%s',
    app.get('ipAdress'),
    app.get('port')
  )
);

module.exports = app; // export app just for testing purpose
