const router = require('./api/router');
const cron = require('node-cron');
const { launchWebScrapers } = require('./web_scrapers/launchWebScrapers');
const port = process.env.PORT || 4000;

router.listen(port, () => {
  console.log(`FAANG Connector server listening on port:${port}`);
});

// Insert jobs/candidates once every day at midnight
cron.schedule('0 0 0 * * *', launchWebScrapers);

launchWebScrapers();
