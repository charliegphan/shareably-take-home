require('dotenv').config();
const request = require('request');

const generateWeekOfDates = (dateRangeOfWeek) => {
  const [startDate, endDate] = dateRangeOfWeek.split(',').map(date => new Date(date));
  endDate.setDate(endDate.getDate() + 1);

  const weekOfDates = [];

  const currentDate = startDate;

  while (currentDate < endDate) {
    const day = currentDate.getUTCDate();
    const year = currentDate.getUTCFullYear();
    let month = currentDate.getUTCMonth() + 1;

    month = month >= 10 ? month : `0${month}`;

    weekOfDates.push(`${year}-${month}-${day}`);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return weekOfDates;
};

const generateWeekOfMetrics = (dateRangeOfWeek = '2019-01-25,2019-01-31', callback) => {
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

      resolve(JSON.parse(res.body));
    });
  }));

  Promise.all(promisedMetrics).then(results => callback(results));
};

const aggregateWeekOfMetrics = (weekOfMetrics) => {
  console.log(weekOfMetrics);
};

const calculateDayToDayTrend = (adCampaignDay1, adCampaignDay2) => {

};

const calculateWeekTrend = () => {

};

const convertWeekOfMetricsToAdCampaignsByWeek = (weekOfMetrics) => {

};

const calculateProfit = (weekOfMetrics) => {

};

generateWeekOfMetrics('2019-01-25,2019-01-31', aggregateWeekOfMetrics);

exports = {
  aggregateWeekOfMetrics,
};
