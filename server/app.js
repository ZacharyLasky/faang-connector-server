import express from 'express';
import db from './data/db';
import { launchGoogleWebScraper } from './web_scrapers/jobs/google';
import { launchCandidateWebScraper } from './web_scrapers/candidates/signalHire';

const app = express();
const port = 4000;

app.get('/', (req, res) => {
  res.send('FAANG Connector Server');
});

app.listen(port, () => {
  console.log(`FAANG Connector server listening on port:${port}`);
});

const launchWebScrapers = async () => {
  const googleJobs = await launchGoogleWebScraper();
  // const candidates = await launchCandidateWebScraper();

  Promise.all(googleJobs)
    .then((jobData) => {
      db('jobs')
        .del()
        .then((res) => {
          console.log(`Deleted ${res} records`);
          db.batchInsert('jobs', jobData)
            .returning('*')
            .then((res) => console.log(`Inserted ${res.length} records`))
            .catch((err) =>
              console.log('Could not insert data. Failed with the following error: ', err)
            );
        })
        .catch((err) =>
          console.log('Could not insert data. Failed with the following error: ', err)
        );
    })
    .catch((err) => console.log('Could not get data. Failed with the following error: ', err));

  // Promise.all(candidates)
  //   .then((candidateData) => {
  //     db('candidates')
  //       .del()
  //       .then((res) => {
  //         console.log(`Deleted ${res} records`);
  //         db.batchInsert('candidates', candidateData)
  //           .returning('*')
  //           .then((res) => console.log(`Inserted ${res.length} records`))
  //           .catch((err) =>
  //             console.log('Could not insert data. Failed with the following error: ', err)
  //           );
  //       })
  //       .catch((err) =>
  //         console.log('Could not insert data. Failed with the following error: ', err)
  //       );
  //   })
  //   .catch((err) => console.log('Could not get data. Failed with the following error: ', err));
};

launchWebScrapers();
