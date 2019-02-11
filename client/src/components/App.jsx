import React, { Component } from 'react';
import axios from 'axios';

import Header from './Header.jsx';
import CampaignDisplay from './CampaignDisplay.jsx';
import Options from './Options.jsx';

import styles from '../../../styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: 'week', // other is single date;
      week: '2019-01-25,2019-01-31',
      weekMetrics: [],
    };

    this.handleChangeOptions = this.handleChangeOptions.bind(this);
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

  handleChangeOptions(option) {
    this.setState({
      display: option,
    });
  }

  render() {
    const {
      display,
      weekMetrics,
    } = this.state;

    return (
      <div className={styles.wrapper}>
        <Header />
        <Options
          display={display}
          handleChangeOptions={this.handleChangeOptions}
        />
        <CampaignDisplay weekMetrics={weekMetrics} />
      </div>
    );
  }
}

export default App;
