import React from 'react';

import styles from '../../../styles/Options.css';

const Options = ({ display, handleChangeOptions}) => (
  <div className={styles.options}>
    <div>displaying by: {display}</div>
    <select
      className={styles.dropdown}
      defaultValue={display}
      onChange={e => handleChangeOptions(e.target.value)}
    >
      <option value="date">Date</option>
      <option value="week">Week</option>
    </select>
  </div>
);

export default Options;
