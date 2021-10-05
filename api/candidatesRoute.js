const express = require('express');
const router = express.Router();
const db = require('../data/db');

router.get('/', (req, res) => {
  db('candidates')
    .select('*')
    .then((candidateData) => {
      res.status(200).send(candidateData);
    })
    .catch((err) => {
      res.status(500).send('Could not get candidate data. Failed with the following error: ', err);
    });
});

module.exports = router;
