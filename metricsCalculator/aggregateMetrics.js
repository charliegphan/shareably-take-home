require('dotenv').config();
const request = require('request');

/*
dateRange will be two dates that are comma separated
*/

const generateWeekOfDates = (dateRange = '2019-01-25,2019-01-31') => {
  const [startDate, endDate] = dateRange.split(',').map(date => new Date(date));
  endDate.setDate(endDate.getDate() + 1);

  const weekOfDates = [];

  const currentDate = startDate;

  while (currentDate < endDate) {
    const month = currentDate.getUTCMonth() + 1;
    const day = currentDate.getUTCDate();
    const year = currentDate.getUTCFullYear();

    weekOfDates.push(`${year}-${month}-${day}`);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return weekOfDates;
};

const requestMetricsByDate = (date = '2019-01-25') => {
  const urlAndQuery = {
    url: 'http://api.shareably.net:3030/ad-insights',
    qs: {
      accessToken: process.env.ACCESSTOKEN,
      metrics: 'spend,revenue,impressions,clicks',
      date,
    },
  };

  request(urlAndQuery, (err, res, body) => {
    if (err) {
      console.log(err);
    }

    console.log(JSON.parse(body));
  });
};

requestMetricsByDate();

const aggregateMetrics = () => {

};

exports = {
  aggregateMetrics,
};
