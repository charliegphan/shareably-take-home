require('dotenv').config();
const express = require('express');
const request = require('request');

const app = express();
const path = require('path');

app.use(express.static(path.resolve(__dirname, '../public')));

app.get('/week', (req, res) => {
  const urlAndQuery = {
    url: 'http://api.shareably.net:3030/ad-insights',
    qs: {
      accessToken: process.env.ACCESSTOKEN,
      d: req.query.w,
      metrics: 'spend,revenue,impressions,clicks',
    },
  };

  const apiResponse = request(urlAndQuery, (err, res, body) => {
    if (err) {
      console.log(err);
    }

    console.log(body);
  });
  res.send('hello');
});

app.listen(process.env.PORT, () => {
  console.log('listening on port', process.env.PORT);
});
