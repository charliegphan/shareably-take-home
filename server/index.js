require('dotenv').config();
const express = require('express');
const path = require('path');

const {
  allocateBudget,
} = require('../metricsCalculator/budgetRecommendation');

const {
  generateWeekOfMetrics,
} = require('../metricsCalculator/apiCall');

const {
  grabAdCampaignWeek,
} = require('../metricsCalculator/grabAdCampaignWeek');

const {
  convertWeekOfMetricsToAdCampaignsByWeek,
  aggregateWeekOfMetrics,
  sortAggregateWeekOfMetricsByProfit,
} = require('../metricsCalculator/organizeMetrics');

const {
  calculateAggregateProfitsForWeek,
} = require('../metricsCalculator/calculate');

const app = express();

app.use(express.static(path.resolve(__dirname, '../public')));

app.use('/campaign', (req, res) => {
  generateWeekOfMetrics(req.query.week, (weekOfMetrics) => {
    convertWeekOfMetricsToAdCampaignsByWeek(weekOfMetrics, (adCampaignWeeks) => {
      const campaignWeek = grabAdCampaignWeek(adCampaignWeeks, req.query.id);
      res.send(campaignWeek);
    });
  });
});

// well aware of this callback hell
app.get('/week', (req, res) => {
  generateWeekOfMetrics(req.query.week, (weekOfMetrics) => {
    convertWeekOfMetricsToAdCampaignsByWeek(weekOfMetrics, (adCampaignWeeks) => {
      aggregateWeekOfMetrics(adCampaignWeeks, (metricsCombinedAcrossWeek) => {
        calculateAggregateProfitsForWeek(metricsCombinedAcrossWeek,
          (aggregateMetricsWithProfit) => {
            sortAggregateWeekOfMetricsByProfit(aggregateMetricsWithProfit,
              (sortedAggregateWeekOfMetricsByProfit) => {
                allocateBudget(sortedAggregateWeekOfMetricsByProfit,
                  (metricsWithBudgetReccomendation) => {
                    res.send(metricsWithBudgetReccomendation);
                  });
              });
          });
      });
    });
  });
});

app.listen(process.env.PORT, () => {
  console.log('listening on port', process.env.PORT);
});
