const express = require('express');
const router = express.Router();
const db = require('../data/db');

router.get('/', (req, res) => {
  let company = req.query.company;

  if (company.length !== 0) {
    db('jobs')
      .select('*')
      .where('company', company)
      .then((jobData) => {
        res.status(200).send(jobData);
      })
      .catch((err) => {
        res.status(500).send('Could not get job data. Failed with the following error: ', err);
      });
  } else {
    db('jobs')
      .select('*')
      .then((jobData) => {
        res.status(200).send(jobData);
      })
      .catch((err) => {
        res.status(500).send('Could not get job data. Failed with the following error: ', err);
      });
  }
});

router.get('/:id', (req, res) => {
  const id = req.params.id;

  db('jobs')
    .select('*')
    .where('id', id)
    .then((jobData) => {
      res.status(200).send(jobData);
    })
    .catch((err) => {
      res.status(500).send('Could not get job data. Failed with the following error: ', err);
    });
});

module.exports = router;
