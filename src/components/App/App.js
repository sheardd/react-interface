import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import ep from '../../constants';
import Interface from '../Interface';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "ki",
    };
  }

  render() {
    const {type} = this.state;
    return (
      <Interface
      type={type}
      />
    );
  }
}

export default App;
