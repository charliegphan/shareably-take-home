import React, { Component } from 'react';
import axios from 'axios';

import Header from './Header.jsx';
import CampaignDisplay from './CampaignDisplay.jsx';

import styles from '../../../styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: 'dateRange', // other is single date;
      range: {
        startDate: '2019-01-25',
        endDate: '2019-01-31',
      },
      day: null,
    };
  }

  componentDidMount() {
    axios.get('/hi')
      .then(res => console.log(res))
      .catch(err => console.log(err));
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
