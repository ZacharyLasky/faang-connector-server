const db = require('../data/db');
const { launchGoogleWebScraper } = require('../web_scrapers/jobs/google');
const { launchCandidateWebScraper } = require('../web_scrapers/candidates/signalHire');

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

module.exports = { launchWebScrapers };
