import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import {ep, ajaxurl} from '../../constants';
import Interface from '../Interface';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "ki",
      store: {
        handle: ep.stores.testing.handle,
        wait_time: ep.stores.testing.wait_time,
        wt_updated: ep.stores.testing.wt_updated,
      },
      nonce: ep.staff_nonce,
    };
  }

  render() {
    const {type,store,nonce} = this.state;
    return (
      <Interface
      type={type}
      store={store}
      nonce={nonce}
      />
    );
  }
}

export default App;
