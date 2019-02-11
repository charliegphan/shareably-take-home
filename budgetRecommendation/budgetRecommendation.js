require('dotenv').config();

const {
  addZeroRevenue,
} = require('./decorators');

const {
  calculateAggregateProfitsForWeek,
} = require('./calculate');

const {
  generateWeekOfMetrics,
} = require('./apiCall');

/*
NOTE - I understand Math.round should never be used
for actual money - I used rounding for consistency
in the UI.
*/

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
        Math.round(((Math.round((budgetAllocation * 100)) / 100) + 70) * 100) / 100
      );
    }
  });

  callback(sortedAggregateWeekOfMetricsByProfit);
};

module.exports = {
  allocateBudget,
};
