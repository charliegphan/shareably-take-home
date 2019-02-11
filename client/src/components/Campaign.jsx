import React from 'react';

import styles from '../../../styles/Campaign.css';

const Campaign = ({ adCampaign, handleSelectCampaign }) => (
  <tr className={styles.row}>
    <td
      className={styles.id} 
      onClick={() => handleSelectCampaign(adCampaign.id)}
    >
      {adCampaign.id}
    </td>
    <td>{adCampaign.revenue}</td>
    <td>{adCampaign.spend}</td>
    <td>{adCampaign.profit}</td>
    <td>{adCampaign.impressions}</td>
    <td>{adCampaign.clicks}</td>
    <td>{adCampaign.budgetRecommendation}</td>
  </tr>
);


export default Campaign;
