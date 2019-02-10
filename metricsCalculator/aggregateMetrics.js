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

const convertWeekOfMetricsToAdCampaignsByWeek = (weekOfMetrics, callback) => {
  const adCampaignWeeks = [];

  for (let i = 0; i < weekOfMetrics[0].length; i += 1) {
    const adCampaignWeek = [];
    for (let j = 0; j < weekOfMetrics.length; j += 1) {
      adCampaignWeek.push(weekOfMetrics[j][i]);
    }
    adCampaignWeeks.push(adCampaignWeek);
  }

  callback(adCampaignWeeks);
};

const aggregateWeekOfMetrics = (adCampaignWeeks) => {
  const aggregatedMetrics = adCampaignWeeks.map((adCampaignWeek) => {
    return adCampaignWeek.reduce((adCampaignSingleDayMetrics, nextDayMetrics) => {

      return {
        spend: Math.round((adCampaignSingleDayMetrics.spend + nextDayMetrics.spend) * 100) / 100,
        revenue: Math.round((adCampaignSingleDayMetrics.revenue + nextDayMetrics.revenue) * 100) / 100,
        impressions: adCampaignSingleDayMetrics.impressions + nextDayMetrics.impressions,
        clicks: adCampaignSingleDayMetrics.clicks + nextDayMetrics.clicks,
        id: adCampaignSingleDayMetrics.id,
      };
    });
  });

  console.log(aggregatedMetrics);
};

const calculateDayToDayTrend = (adCampaignDay1, adCampaignDay2) => {

};

const calculateWeekTrend = (adCampaignWeeks) => {

};

const calculateProfit = () => {

};

generateWeekOfMetrics('2019-01-25,2019-01-31', (weekOfMetrics) => {
  convertWeekOfMetricsToAdCampaignsByWeek(weekOfMetrics, (adCampaignWeeks) => {
    aggregateWeekOfMetrics(adCampaignWeeks);
  });
});
// generateWeekOfMetrics('2019-01-25,2019-01-31', convertWeekOfMetricsToAdCampaignsByWeek);


exports = {
  aggregateWeekOfMetrics,
};
