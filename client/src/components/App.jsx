import React, { Component } from 'react';
import axios from 'axios';

import Header from './Header.jsx';
import CampaignDisplay from './CampaignDisplay.jsx';
import CurrentCampaignDisplay from './CurrentCampaignDisplay.jsx';

import styles from '../../../styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
      currentCampaign: null,
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
      currentCampaign: res.data,
    }));
  }

  handleDisplayWeekSummary() {
    this.setState({
      currentCampaign: null,
    })
  }

  render() {
    const {
      weekMetrics,
      currentCampaign,
    } = this.state;

    let currentDisplay;
    let displayWeekSummaryButton;

    if (currentCampaign) {
      currentDisplay = (
        <CurrentCampaignDisplay
          adCampaignWeek={currentCampaign}
        />
      );
      displayWeekSummaryButton = (
        <div className={styles.buttonWrapper}>
          <button
            className={styles.button}
            type="button"
            onClick={() => this.handleDisplayWeekSummary()}
          >Display Week Summary
          </button>
        </div>
      );
    } else {
      currentDisplay = (
        <CampaignDisplay
          weekMetrics={weekMetrics}
          handleSelectCampaign={this.handleSelectCampaign}
        />
      );
      displayWeekSummaryButton = (<div className={styles.buttonWrapper} />);
    }

    let loading;

    if (weekMetrics.length > 0) {
      loading = (
        <div className={styles.wrapper}>
          <Header />
          {displayWeekSummaryButton}
          {currentDisplay}
        </div>
      );
    } else {
      loading = (<div />);
    }

    return (
      <div>
        {loading}
      </div>
    );
  }
}

export default App;
