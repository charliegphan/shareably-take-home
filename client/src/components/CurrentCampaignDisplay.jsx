import React from 'react';

import styles from '../../../styles/CampaignDisplay.css';

const CurrentCampaignDisplay = ({ adCampaignWeek}) => (
  <div>
    <table>
      <tbody>
        <tr>
          <th>Campaign ID</th>
          <th>Revenue</th>
          <th>Spend</th>
          <th>Profit</th>
          <th>Impressions</th>
          <th>Clicks</th>
          <th>Trend</th>
        </tr>

        
      </tbody>
    </table>
  </div>
);


export default CurrentCampaignDisplay;
