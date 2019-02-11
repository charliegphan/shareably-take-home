import React, { Component } from 'react';
import axios from 'axios';

import Header from './Header.jsx';
import CampaignDisplay from './CampaignDisplay.jsx';

import styles from '../../../styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: 'weekSummary', // other display
      week: '2019-01-25,2019-01-31',
      currentCampaign: null,
      weekMetrics: [],
    };

    this.handleSelectCampaign = this.handleSelectCampaign.bind(this);
  }

  componentDidMount() {
    axios.get('/week', {
      params: {
        week: '2019-01-25,2019-01-31',
      },
    }).then(res => this.setState({
      weekMetrics: res.data,
    }))
      .catch(err => console.log(err));
  }

  handleSelectCampaign(id) {
    axios.get('/campaign', {
      params: {
        week: '2019-01-25,2019-01-31',
        id,
      },
    }).then(res => this.setState({

    }));
  }

  render() {
    const {
      display,
      weekMetrics,
    } = this.state;

    return (
      <div className={styles.wrapper}>
        <Header />
        <CampaignDisplay
          weekMetrics={weekMetrics}
          handleSelectCampaign={this.handleSelectCampaign}
        />
      </div>
    );
  }
}

export default App;
