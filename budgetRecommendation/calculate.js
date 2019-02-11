
const calculateProfit = metrics => (
  Math.round((metrics.revenue - metrics.spend) * 100) / 100
);

// decorator function to add profit to metrics
// parameters: array of metrics for one ad campaign for the week
const calculateAggregateProfitsForWeek = (weekOfMetrics, callback) => {
  weekOfMetrics.forEach((adCampaign) => {
    const profit = calculateProfit(adCampaign);
    adCampaign.profit = profit;
  });

  callback(weekOfMetrics);
};

module.exports = {
  calculateProfit,
  calculateAggregateProfitsForWeek,
};
