import React from 'react';

const CurrentCampaign = ({ singleDayMetrics }) => (
  <tr>
    <td>{singleDayMetrics.id}</td>
    <td>{singleDayMetrics.date}</td>
    <td>{singleDayMetrics.revenue}</td>
    <td>{singleDayMetrics.spend}</td>
    <td>{singleDayMetrics.profit}</td>
    <td>{singleDayMetrics.impressions}</td>
    <td>{singleDayMetrics.clicks}</td>
  </tr>
);

export default CurrentCampaign;
