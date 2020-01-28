import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import Interface from '../Interface';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      store: {
        wait_time: props.wait_time,
        wt_updated: props.wt_updated,
      },
      orders:{
        open: {},
        other: {}
      },
    };
  }

  render() {
    const {type,handle,nonce, ajaxurl} = this.props;
    const {store,orders} = this.state;
    return (
      <Interface
      type={type}
      handle={handle}
      nonce={nonce}
      store={store}
      orders={orders}
      ajaxurl={ajaxurl}>
      </ Interface>
    );
  }
}

export default App;
