'use strict';

const express = require('express');
const path    = require('path');
const config  = require('../../config');

const router = express.Router();

const INDEX_HTML = 'index.html';

router.get('/', (req, res) => {
  res
  .status(200)
  .sendFile(path.join(config.staticsPath, INDEX_HTML));
});

module.exports = router;
