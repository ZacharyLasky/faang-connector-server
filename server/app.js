import express from 'express';

const app = express();
const port = 4000;

app.get('/', (req, res) => {
  res.send('FAANG Connector Server');
});

app.listen(port, () => {
  console.log(`FAANG Connector server listening on port:${port}`);
});
