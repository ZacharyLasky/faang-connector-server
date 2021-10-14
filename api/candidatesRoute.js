const express = require('express');
const router = express.Router();
const db = require('../data/db');
const { getMatchingCandidates } = require('../lib/getMatchingCandidates');

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

// Get candidates by job id
router.get('/job/:id', (req, res) => {
  const id = req.params.id;

  Promise.all([
    db('candidates').select('*'),
    db('jobs').select('job_qualifications').where('id', id)
  ])
    .then(([candidateData, jobQualificationsData]) => {
      const matches = getMatchingCandidates({ candidateData, jobQualificationsData });
      res.status(200).send(matches);
    })
    .catch((err) => {
      res.status(500).send('Could not get candidate data. Failed with the following error: ', err);
    });
});

module.exports = router;
