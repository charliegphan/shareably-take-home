import React from 'react';

const Campaign = ({ adCampaign }) => (
  <tr>
    <td>{adCampaign.id}</td>
    <td>{adCampaign.revenue}</td>
    <td>{adCampaign.spend}</td>
    <td>{adCampaign.profit}</td>
    <td>{adCampaign.impressions}</td>
    <td>{adCampaign.clicks}</td>
    <td></td>
    <td>{adCampaign.budgetRecommendation}</td>
  </tr>
);


export default Campaign;
