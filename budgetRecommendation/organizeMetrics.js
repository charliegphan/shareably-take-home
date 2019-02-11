const { addZeroRevenue } = require('./decorators');

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

const aggregateWeekOfMetrics = (adCampaignWeeks, callback) => {
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

  callback(aggregatedMetrics);
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

module.exports = {
  convertWeekOfMetricsToAdCampaignsByWeek,
  aggregateWeekOfMetrics,
  sortAggregateWeekOfMetricsByProfit,
};
