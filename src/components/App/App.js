import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import Interface from '../Interface';
import FeedGrp from '../FeedGrp';
import Location from '../Location';
import './App.css';
import sampleOrders from '../../sample-data/sampleOrders.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      wait: {
        wait_time: props.wait_time,
        wt_updated: props.wt_updated,
      },
      activeFeed: "open",
      orders: sampleOrders,
    };

    this.switchFeed = this.switchFeed.bind(this);
    this.toggleOrder = this.toggleOrder.bind(this);
    this.updateOrder = this.updateOrder.bind(this);
    this.stop = this.stop.bind(this);
    this.restart = this.restart.bind(this);
  }

  render() {
    const {type, handle, nonce, ajaxurl} = this.props;
    const {wait, activeFeed, orders} = this.state;
    return (
      <Interface
      type={type}
      handle={handle}
      nonce={nonce}
      wait={wait}
      orders={orders}
      ajaxurl={ajaxurl}
      activeFeed={activeFeed}
      switchFeed={this.switchFeed}
      stop={this.stop}
      restart={this.restart} >
        <FeedGrp
          orders={orders}
          activeFeed={activeFeed}
          type={type}
          toggleOrder={this.toggleOrder}
          updateOrder={this.updateOrder} />
        <Location>{handle.toUpperCase()}</Location>
      </ Interface>
    );
  }

  switchFeed(feed) {
    this.setState({activeFeed: feed});
  }

  toggleOrder(orderId, feed) {
    const {orders} = this.state;
    const {open, ...rest} = orders[feed][orderId];
    const toggle = !open;
    this.setState({orders: {
      ...orders,
      [feed]: {
        ...orders[feed],
        [orderId]: {
          ...rest,
          open: toggle
        }
      }
    }});
  }

  updateOrder(e, args) {
    e.stopPropagation();
    const {
      orderId,
      action,
      feed,
      data,
    } = args;
    const {orders} = this.state;
    const {index, ...rest} = orders[feed];
    const order = orders[feed][orderId];
    const newFeed = (feed => feed === "open" ? "other" : "open")(feed);
    const removeId = id => id !== orderId;
    const updatedIndex = index.filter(removeId);
    const newIndex = [...orders[newFeed].index, orderId];
    
     // Currently broken, we need to install lodash or similar to use for Deep cloning our order objects
     // * (it looks like we'll currently have to rebuild the feed object we're removing the order from from scratch,
     // * minus the one order we're trying to remove, remembering to remove the orderId from its index when doing so)
    
    this.setState({
      orders: {
        [feed]: {
          ...orders[feed],
          index: updatedIndex,
        },
        [newFeed]: {
          ...orders[newFeed],
          index: newIndex,
          [orderId]: order,
        }
      }
    });
  }

  stop() {
    ReactDOM.unmountComponentAtNode(document.getElementById('root'));
  }

  restart() {
    // we should store wait time data in KitchenInterface state, and add a method to
    // KitchenInterface's componentDidMount to pull in wait time data fresh each time,
    // otherwise when we restart we're potentially using old data from outside the app
    // before it was initialised.
    this.setState({orders: sampleOrders, activeFeed: "open"});
  }
}

export default App;
