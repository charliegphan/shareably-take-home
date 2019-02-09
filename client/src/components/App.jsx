import React, { Component } from 'react';

import Header from './Header.jsx';

import styles from '../../../styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <Header />
      </div>
    );
  }
}

export default App;
