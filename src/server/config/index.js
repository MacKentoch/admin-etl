/* eslint-disable no-process-env */
'use strict';

const path = require('path');

const DOCS_PATH = '../../../docs/';

module.exports = {
  port: process.env.PORT || 8080,
  apiAdress: 'localhost',

  staticsPath: path.join(__dirname, DOCS_PATH),

  database: {
    server: '',
    userName: '',
    password: ''
  }
};
