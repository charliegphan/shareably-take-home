import React from 'react';

import styles from '../../../styles/Header.css';

const Header = () => (
  <div>
    <img
      className={styles.image}
      alt=""
      src="http://sbly-web-prod-shareably.netdna-ssl.com/assets/shareably-horizontal-expanded-2.png"
    />
    <div className={styles.header}>INTERNAL TOOLS</div>
  </div>

);

export default Header;
