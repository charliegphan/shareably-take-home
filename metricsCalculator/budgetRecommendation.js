require('dotenv').config();
const request = require('request');

/*
NOTE - I understand Math.round should never be used
for actual money - I used rounding for consistency
in the UI.
*/

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

      resolve(JSON.parse(res.body));
    });
  }));

  Promise.all(promisedMetrics).then(results => callback(results));
};

// VIEW BY AD CAMPAIGN

// decorator function
// set revenue to zero if revenue does not exist on metrics
const addZeroRevenue = (metrics) => {
  if (!metrics.hasOwnProperty('revenue')) {
    metrics.revenue = 0;
  }

  return metrics;
};

const convertWeekOfMetricsToAdCampaignsByWeek = (weekOfMetrics, callback) => {
  const adCampaignWeeks = [];

  for (let i = 0; i < weekOfMetrics[0].length; i += 1) {
    const adCampaignWeek = [];
    for (let j = 0; j < weekOfMetrics.length; j += 1) {
      addZeroRevenue(weekOfMetrics[j][i]);
      adCampaignWeek.push(weekOfMetrics[j][i]);
    }
    adCampaignWeeks.push(adCampaignWeek);
  }

  callback(adCampaignWeeks);
};

const grabAdCampaignWeek = (adCampaignWeeks, id) => {
  for (let i = 0; i < adCampaignWeeks.length; i += 1) {
    if (adCampaignWeeks[i][0].id === id) {
      addProfitToCampaignWeek(adCampaignWeeks[i]);
      return adCampaignWeeks[i];
    }
  }
};

// parameters: an object containing a single day of metrics for an ad campaign
const calculateProfit = metrics => (
  Math.round((metrics.revenue - metrics.spend) * 100) / 100
);

const addProfitToCampaignWeek = (adCampaignWeek) => {
  adCampaignWeek.forEach((dayMetric) => {
    const profit = calculateProfit(dayMetric);
    dayMetric.profit = profit
  });
}

// WEEK VIEW
const aggregateWeekOfMetrics = (adCampaignWeeks, callback) => {
  const aggregatedMetrics = adCampaignWeeks.map((adCampaignWeek) => {
    return adCampaignWeek.reduce((adCampaignSingleDayMetrics, nextDayMetrics) => {
      // console.log(adCampaignSingleDayMetrics.revenue, 'adcamp rev');
      // console.log(adCampaignSingleDayMetrics.revenue, 'nextDay rev');
      return {
        spend: Math.round((adCampaignSingleDayMetrics.spend + nextDayMetrics.spend) * 100) / 100,
        revenue: Math.round((adCampaignSingleDayMetrics.revenue + nextDayMetrics.revenue) * 100) / 100,
        impressions: adCampaignSingleDayMetrics.impressions + nextDayMetrics.impressions,
        clicks: adCampaignSingleDayMetrics.clicks + nextDayMetrics.clicks,
        id: adCampaignSingleDayMetrics.id,
      };
    });
  });

  callback(aggregatedMetrics);
};

// DISPLAY METRICS CALCULATIONS

// decorator function to add profit to metrics
// parameters: array of metrics for one ad campaign for the week
const calculateAggregateProfitsForWeek = (weekOfMetrics, callback) => {
  weekOfMetrics.forEach((adCampaign) => {
    const profit = calculateProfit(adCampaign);
    adCampaign.profit = profit;
  });

  callback(weekOfMetrics);
};


const sortAggregateWeekOfMetricsByProfit = (
  aggregateMetricsWithProfit,
  callback,
) => {
  const profitComparator = (adCampaign1, adCampaign2) => (
    adCampaign2.profit - adCampaign1.profit
  );

  aggregateMetricsWithProfit.sort(profitComparator);

  callback(aggregateMetricsWithProfit);
};

// BUDGET RECOMMENDATION CALCUALTIONS

const allocateBudget = (sortedAggregateWeekOfMetricsByProfit, callback) => {
  let budgetToAllocate = 0;
  let positiveProfit = 0;

  const profitableCampaigns = [];
  const unprofitableCampaigns = [];

  sortedAggregateWeekOfMetricsByProfit.forEach((adCampaign) => {
    if (adCampaign.profit < 0) {
      budgetToAllocate += 70;
      unprofitableCampaigns.push(adCampaign);
    } else {
      positiveProfit += adCampaign.profit;
      profitableCampaigns.push(adCampaign);
    }
  });

  budgetToAllocate = Math.round((budgetToAllocate * 100)) / 100;
  positiveProfit = Math.round((positiveProfit * 100)) / 100;

  sortedAggregateWeekOfMetricsByProfit.forEach((adCampaign) => {

    if (adCampaign.profit < 0) {
      adCampaign.budgetRecommendation = 0;
    } else {
      const percentageContributionToProfit = adCampaign.profit / positiveProfit;
      const budgetAllocation = budgetToAllocate * percentageContributionToProfit;
      adCampaign.budgetRecommendation = (
        Math.round((budgetAllocation * 100)) / 100
      );
    }
  });

  callback(sortedAggregateWeekOfMetricsByProfit);
};

// generateWeekOfMetrics('2019-01-25,2019-01-31', (weekOfMetrics) => {
//   convertWeekOfMetricsToAdCampaignsByWeek(weekOfMetrics, (adCampaignWeeks) => {
//     aggregateWeekOfMetrics(adCampaignWeeks, (metricsCombinedAcrossWeek) => {
//       calculateAggregateProfitsForWeek(metricsCombinedAcrossWeek,
//         (aggregateMetricsWithProfit) => {
//           sortAggregateWeekOfMetricsByProfit(aggregateMetricsWithProfit,
//             (sortedAggregateWeekOfMetricsByProfit) => {
//               allocateBudget(sortedAggregateWeekOfMetricsByProfit);
//             });
//         });
//     });
//   });
// });


module.exports = {
  generateWeekOfMetrics,
  convertWeekOfMetricsToAdCampaignsByWeek,
  aggregateWeekOfMetrics,
  calculateAggregateProfitsForWeek,
  sortAggregateWeekOfMetricsByProfit,
  allocateBudget,
  grabAdCampaignWeek,
};