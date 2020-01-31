import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { omit } from 'lodash';
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
      popUps: {
        menu: {
          open: true,
          id: "menu",
          description: "Tap a heading to open, then tap items to hide them from the online menu. Items in red will be hidden upon updating.",
        },
        driver: {
          open: false,
          id: "driver",
          description: "Tap a Driver's name, or unassign, then tap confirm.",
        },
        error: {
          open: false,
          id: "error",
          description: false,
          list: []
        },
        settle: {
          open: false,
          id: "settle",
          description: "Definitely settle all orders? Orders will no longer be accessible once settled.",
        },
      }
    };

    this.switchActiveFeed = this.switchActiveFeed.bind(this);
    this.toggleOrder = this.toggleOrder.bind(this);
    this.updateOrder = this.updateOrder.bind(this);
    this.moveOrder = this.moveOrder.bind(this);
    this.stop = this.stop.bind(this);
    this.restart = this.restart.bind(this);
  }

  render() {
    const {type, handle, nonce, ajaxurl} = this.props;
    const {wait, activeFeed, orders, popUps} = this.state;
    return (
      <Interface
      type={type}
      handle={handle}
      nonce={nonce}
      wait={wait}
      orders={orders}
      popUps={popUps}
      ajaxurl={ajaxurl}
      activeFeed={activeFeed}
      switchActiveFeed={this.switchActiveFeed}
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

  switchActiveFeed(feed) {
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
    if (action === "done" || action === "revert") {
      this.moveOrder(orderId, feed);
    }
  }

  moveOrder(orderId, feed) {
    this.setState((prevState) => {
      const {orders} = prevState;
      const {index} = orders[feed];
      const order = orders[feed][orderId];
      const updtdIndex = index.filter((id) => id !== orderId);
      const updtdFeed = omit(orders[feed], orderId.toString());
      const newFeed = (feed => feed === "open" ? "other" : "open")(feed);
      const newIndex = [...orders[newFeed].index, orderId];
      return {
        orders: {
          [feed]: {
            ...updtdFeed,
            index: updtdIndex,
          },
          [newFeed]: {
            ...orders[newFeed],
            index: newIndex,
            [orderId]: order,
          }
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
