import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import Interface from '../Interface';
import Nav from '../Nav';
import FeedGrp from '../FeedGrp';
import Status from '../Status';
import Location from '../Location';
import './App.css';
import sampleOrders from '../../sample-data/sampleOrders.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      store: {
        wait_time: props.wait_time,
        wt_updated: props.wt_updated,
      },
      activeFeed: "open",
      orders: sampleOrders,
    };

    this.switchFeed = this.switchFeed.bind(this);
  }

  render() {
    const {type, handle, nonce, ajaxurl} = this.props;
    const {store, activeFeed, orders} = this.state;
    return (
      <Interface
      type={type}
      handle={handle}
      nonce={nonce}
      store={store}
      orders={orders}
      ajaxurl={ajaxurl} >
        <Nav
        type={type}
        store={store}
        activeFeed={activeFeed}
        switchFeed={this.switchFeed} />
        <FeedGrp
          orders={orders}
          activeFeed={activeFeed} />
        <Location>{handle.toUpperCase()}</Location>
        {type === "ki" ? <Status /> : null}
      </ Interface>
    );
  }

  switchFeed(feed) {
    this.setState({activeFeed: feed});
  }
}

export default App;
