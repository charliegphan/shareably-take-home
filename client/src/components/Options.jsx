import React from 'react';

import styles from '../../../styles/Options.css';

const Options = () => (
  <div className={styles.options}>
    <select>
      <option value="date">Date</option>
      <option value="week">Week</option>
    </select>
  </div>
);

export default Options;
