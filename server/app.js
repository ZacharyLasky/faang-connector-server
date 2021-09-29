import express from 'express';
import db from './data/db';
const cors = require('cors');
import { launchGoogleWebScraper } from './web_scrapers/jobs/google';
import { launchCandidateWebScraper } from './web_scrapers/candidates/signalHire';

const app = express();
const port = process.env.PORT || 4000;

app.use(
  cors({
    origin: '*'
  })
);

app.listen(port, () => {
  console.log(`FAANG Connector server listening on port:${port}`);
});

app.get('/', (req, res) => {
  console.log('hit!');
  res.send('FAANG Connector Server');
});

app.get('/jobs', (req, res) => {
  db('jobs')
    .select('*')
    .then((jobData) => {
      res.status(200).send(jobData);
    })
    .catch((err) => {
      res.status(500).send('Could not get job data. Failed with the following error: ', err);
    });
});

app.get('/candidates', (req, res) => {
  db('candidates')
    .select('*')
    .then((candidateData) => {
      res.status(200).send(candidateData);
    })
    .catch((err) => {
      res.status(500).send('Could not get candidate data. Failed with the following error: ', err);
    });
});

const launchWebScrapers = async () => {
  const googleJobs = await launchGoogleWebScraper();
  const candidates = await launchCandidateWebScraper();

  Promise.all(googleJobs)
    .then((jobData) => {
      db('jobs')
        .del()
        .then((res) => {
          console.log(`Deleted ${res} job records`);
          db.batchInsert('jobs', jobData)
            .returning('*')
            .then((res) => console.log(`Inserted ${res.length} job records`))
            .catch((err) =>
              console.log('Could not insert job data. Failed with the following error: ', err)
            );
        })
        .catch((err) =>
          console.log('Could not insert job data. Failed with the following error: ', err)
        );
    })
    .catch((err) => console.log('Could not get job data. Failed with the following error: ', err));

  Promise.all(candidates)
    .then((candidateData) => {
      db('candidates')
        .del()
        .then((res) => {
          console.log(`Deleted ${res} candidate records`);
          db.batchInsert('candidates', candidateData)
            .returning('*')
            .then((res) => console.log(`Inserted ${res.length} candidate records`))
            .catch((err) =>
              console.log('Could not insert candidate data. Failed with the following error: ', err)
            );
        })
        .catch((err) =>
          console.log('Could not insert candidate data. Failed with the following error: ', err)
        );
    })
    .catch((err) =>
      console.log('Could not get candidate data. Failed with the following error: ', err)
    );
};

launchWebScrapers();
