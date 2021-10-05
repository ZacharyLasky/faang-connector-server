const express = require('express');
const router = express();
const cors = require('cors');
const jobsRoute = require('./jobsRoute');
const candidatesRoute = require('./candidatesRoute');

router.use(cors({ origin: '*' }));
router.use('/api/jobs', jobsRoute);
router.use('/api/items', candidatesRoute);

router.get('/', (req, res) => {
  res.send('FAANG Connector Server');
});

module.exports = router;
