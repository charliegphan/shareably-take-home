const {
  addProfitToCampaignWeek,
  addTrendToCampaignWeek,
} = require('./decorators');


const grabAdCampaignWeek = (adCampaignWeeks, id) => {
  for (let i = 0; i < adCampaignWeeks.length; i += 1) {
    if (adCampaignWeeks[i][0].id === id) {
      addProfitToCampaignWeek(adCampaignWeeks[i]);
      addTrendToCampaignWeek(adCampaignWeeks[i]);
      return adCampaignWeeks[i];
    }
  }
};

module.exports = {
  grabAdCampaignWeek,
};
