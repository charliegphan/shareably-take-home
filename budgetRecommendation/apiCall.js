const request = require('request');

const { generateWeekOfDates } = require('./generateDates');
const { addDateToMetrics } = require('./decorators');

const generateWeekOfMetrics = (dateRangeOfWeek, callback) => {
  const weekOfDates = generateWeekOfDates(dateRangeOfWeek);

  const promisedMetrics = weekOfDates.map(date => new Promise((resolve) => {
    const urlAndQuery = {
      url: 'http://api.shareably.net:3030/ad-insights',
      qs: {
        accessToken: process.env.ACCESSTOKEN,
        metrics: 'spend,revenue,impressions,clicks',
        date,
      },
    };

    request(urlAndQuery, (err, res) => {
      if (err) {
        console.log(err);
      }

      const metrics = JSON.parse(res.body);
      addDateToMetrics(metrics, date);
      resolve(metrics);
    });
  }));

  Promise.all(promisedMetrics).then(results => callback(results));
};

module.exports = {
  generateWeekOfMetrics,
};
