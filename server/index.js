require('dotenv').config();
const express = require('express');
const path = require('path');

const {
  generateWeekOfMetrics,
  convertWeekOfMetricsToAdCampaignsByWeek,
  aggregateWeekOfMetrics,
  calculateAggregateProfitsForWeek,
  sortAggregateWeekOfMetricsByProfit,
} = require('../metricsCalculator/budgetRecommendation');


const app = express();

app.use(express.static(path.resolve(__dirname, '../public')));

app.get('/week', (req, res) => {
  generateWeekOfMetrics(req.query.week, (weekOfMetrics) => {
    convertWeekOfMetricsToAdCampaignsByWeek(weekOfMetrics, (adCampaignWeeks) => {
      aggregateWeekOfMetrics(adCampaignWeeks, (metricsCombinedAcrossWeek) => {
        calculateAggregateProfitsForWeek(metricsCombinedAcrossWeek, (aggregateMetricsWithProfit) => {
          sortAggregateWeekOfMetricsByProfit(aggregateMetricsWithProfit, (sortedAggregateMetricsWithProfit) => {
            res.send(sortedAggregateMetricsWithProfit);
          });
        });
      });
    });
  });
});

app.listen(process.env.PORT, () => {
  console.log('listening on port', process.env.PORT);
});
