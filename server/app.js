import express from 'express';
import { launchGoogleWebScraper } from './web_scrapers/jobs/google';
import db from './data/db';

const app = express();
const port = 4000;

app.get('/', (req, res) => {
  res.send('FAANG Connector Server');
});

app.listen(port, () => {
  console.log(`FAANG Connector server listening on port:${port}`);
});

const launchWebScrapers = async () => {
  let jobData = [];
  await launchGoogleWebScraper().then((res) => jobData.push(...res));

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
    .catch((err) => console.log('Could not insert data. Failed with the following error: ', err));
};

launchWebScrapers();
