import React from 'react';

import styles from '../../../styles/Options.css';

const Options = ({ display, handleChangeOptions}) => (
  <div className={styles.options}>
    <h4>displaying by: {display}</h4>
    <select
      defaultValue={display}
      onChange={e => handleChangeOptions(e.target.value)}
    >
      <option value="date">Date</option>
      <option value="week">Week</option>
    </select>
  </div>
);

export default Options;
