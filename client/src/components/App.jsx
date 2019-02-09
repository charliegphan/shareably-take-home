import React, { Component } from 'react';
import axios from 'axios';

import Header from './Header.jsx';
import CampaignDisplay from './CampaignDisplay.jsx';

import styles from '../../../styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: 'week',
    };
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <Header />
        <CampaignDisplay />
      </div>
    );
  }
}

export default App;
