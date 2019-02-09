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
      date: null,
    };

    this.handleChangeOptions = this.handleChangeOptions.bind(this);
  }

  componentDidMount() {
    axios.get('/date', {
      params: {
        date: '2019-01-25',
      },
    }).then(res => console.log(res))
      .catch(err => console.log(err));
  }

  handleChangeOptions(option) {
    this.setState({
      display: option,
    });
  }

  render() {
    const { display } = this.state;

    return (
      <div className={styles.wrapper}>
        <Header />
        <Options
          display={display}
          handleChangeOptions={this.handleChangeOptions}
        />
        <CampaignDisplay />
      </div>
    );
  }
}

export default App;
