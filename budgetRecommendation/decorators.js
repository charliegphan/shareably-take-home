// for adding properties onto metrics objects, sch ad profit and trend

const { calculateProfit } = require('./calculate');

// set revenue to zero if revenue does not exist on metrics
const addZeroRevenue = (metrics) => {
  if (!metrics.hasOwnProperty('revenue')) {
    metrics.revenue = 0;
  }

  return metrics;
};

const addDateToMetrics = (metrics, date) => {
  metrics.forEach(metric => metric.date = date);
};

const addProfitToCampaignWeek = (adCampaignWeek) => {
  adCampaignWeek.forEach((dayMetric) => {
    const profit = calculateProfit(dayMetric);
    dayMetric.profit = profit
  });
};

const addTrendToCampaignWeek = (adCampaignWeek) => {
  for (let i = 1; i < adCampaignWeek.length; i++) {
    const trend = Math.round(
      (adCampaignWeek[i].profit - adCampaignWeek[i - 1].profit) * 100,
    ) / 100;

    adCampaignWeek[i].trend = trend;
  }
};

module.exports = {
  addZeroRevenue,
  addDateToMetrics,
  addProfitToCampaignWeek,
  addTrendToCampaignWeek,
};
