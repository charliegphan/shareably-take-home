require('dotenv').config();
const express = require('express');

const app = express();
const path = require('path');

app.use(express.static(path.resolve(__dirname, '../public')));

app.get('/day', (req, res) => {
  console.log('hit');
  res.send('hello');
});

app.listen(process.env.PORT, () => {
  console.log('listening on port', process.env.PORT);
});
