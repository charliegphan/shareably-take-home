import React from 'react';

import CurrentCampaign from './CurrentCampaign.jsx';

import styles from '../../../styles/CampaignDisplay.css';

const CurrentCampaignDisplay = ({ adCampaignWeek }) => (
  <div className={styles.wrapper}>
    <table className={styles.displayTable}>
      <tbody>
        <tr>
          <th>Campaign ID</th>
          <th>Date</th>
          <th>Revenue</th>
          <th>Spend</th>
          <th>Profit</th>
          <th>Impressions</th>
          <th>Clicks</th>
          <th>Trend</th>
        </tr>

        {adCampaignWeek.map(singleDayMetrics => (
          <CurrentCampaign
            key={singleDayMetrics.date}
            singleDayMetrics={singleDayMetrics} 
          />
        ),
        )}

      </tbody>
    </table>
  </div>
);


export default CurrentCampaignDisplay;
