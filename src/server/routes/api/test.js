'use strict';

const express = require('express');
const dal = require('../../DAL');

const router = express.Router();

router.get('/', (req, res) => {
  dal("select 'test'", () => {
    res
    .status(200)
    .send({
      type: 'test',
      successFull: true
    });
  },
  () => {
    res
    .status(200)
    .send({
      type: 'test',
      successFull: true
    });
  });
});

module.exports = router;
