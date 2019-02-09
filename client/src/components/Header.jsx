import React from 'react';

import styles from '../../../styles/Header.css';

const Header = () => (
  <div>
    <img
      className={styles.image}
      alt=""
      src="http://sbly-web-prod-shareably.netdna-ssl.com/assets/shareably-horizontal-expanded-2.png"
    />
    <h1 className={styles.header}>INTERNAL TOOLS</h1>
  </div>

);

export default Header;
