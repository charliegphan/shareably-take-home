import React from 'react';

import Campaign from './Campaign.jsx';

import styles from '../../../styles/CampaignDisplay.css';

const CampaignDisplay = () => (
  <div className={styles.wrapper}>

    <table className={styles.displayTable}>
      <tbody>
        <tr>
          <th>Campaign ID</th>
          <th>Revenue</th>
          <th>Spend</th>
          <th>Profit</th>
          <th>Impressions</th>
          <th>Clicks</th>
          <th>Trend</th>
          <th>Budget Recommendation</th>
        </tr>
        <Campaign />
      </tbody>
    </table>
  </div>
);


export default CampaignDisplay;
