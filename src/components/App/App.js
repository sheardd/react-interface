import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { omit, cloneDeep } from 'lodash';
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
      orders: {
        open: {
          index: []
        },
        other: {
          index: []
        }
      },
      shouldPoll: null,
      activePoll: null,
      pollTimeout: null,
      popUps: {
        menu: {
          open: false,
          id: "menu",
          description: "Tap a heading to open, then tap items to hide them from the online menu. Items in red will be hidden upon updating.",
        },
        driver: {
          open: false,
          id: "driver",
          description: "Tap a Driver's name, or unassign, then tap confirm.",
          current: null,
        },
        error: {
          open: false,
          id: "error",
          description: false,
          list: [],
        },
        settle: {
          open: false,
          id: "settle",
          description: "Definitely settle all orders? Orders will no longer be accessible once settled.",
        },
      }
    };

    this.fetchOrders = this.fetchOrders.bind(this);
    this.fetchOrdersApi = this.fetchOrdersApi.bind(this);
    this.parseOrders = this.parseOrders.bind(this);
    this.updateOrders = this.updateOrders.bind(this);
    this.checkCancelledDelivered = this.checkCancelledDelivered.bind(this);
    this.filterNewOrders = this.filterNewOrders.bind(this);
    this.setOrderTimes = this.setOrderTimes.bind(this);
    this.switchActiveFeed = this.switchActiveFeed.bind(this);
    this.toggleOrder = this.toggleOrder.bind(this);
    this.updateOrderRequest = this.updateOrderRequest.bind(this);
    this.updateOrderResponse = this.updateOrderResponse.bind(this);
    this.moveOrder = this.moveOrder.bind(this);
    this.togglePup = this.togglePup.bind(this);
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
      fetchOrders={this.fetchOrders}
      popUps={popUps}
      ajaxurl={ajaxurl}
      activeFeed={activeFeed}
      switchActiveFeed={this.switchActiveFeed}
      togglePup={this.togglePup}
      stop={this.stop}
      restart={this.restart} >
        <FeedGrp
          orders={orders}
          activeFeed={activeFeed}
          type={type}
          toggleOrder={this.toggleOrder}
          updateOrderRequest={this.updateOrderRequest}
          togglePup={this.togglePup} />
        <Location>{handle.toUpperCase()}</Location>
      </ Interface>
    );
  }

  switchActiveFeed(feed) {
    this.setState({activeFeed: feed});
  }

  /**
    *
    * Add a check for cancelled orders between parseOrders and saveOrders
    * calls.
    *
    */
  fetchOrders(init = false) {
    const {type} = this.props;
    const {shouldPoll, activePoll, pollTimeout} = this.state;
    if (type === "di" || (type === "ki" && (init || shouldPoll))) {
      this.fetchOrdersApi(type)
        .then(response => this.parseOrders(response, type))
        .then(
          orders => {
            if (this._isMounted) {
              this.setState(this.updateOrders(orders, type));
            }
          },
          error => {
            console.log("An error occurred when parsing orders");
            if (this._isMounted) {
              this.setState({
                shouldPoll: false
              });
            }
          }
        );
    }
  }

  fetchOrdersApi(type) {
    const that = this;
    return new Promise(async (resolve, reject) => {
      const {ajaxurl, handle, nonce,} = that.props;
      const response = await axios.get(
        ajaxurl,
        {
          params: {
            "action": "int_orders",
            "store": handle,
            "staff_nonce": nonce,
            "type": type
          }
        });
      if (response.status === 200) {
        resolve(response);
      } else {
        reject(response);
      }
    });
  }

  parseOrders(response, type) {
    const newOrders = JSON.parse(response.data.body).orders;
    let openIn = [];
    let otherIn = [];
    if (newOrders.length) {
      const sortedOrders = newOrders.reduce((obj, order) => {
        order.json = JSON.parse(order.note_attributes[0].value);
        order.open = false;
        if (type === "ki" || (type === "di" && order.json.address)) {
          const feed = this.orderFeedEval(order, type);
          order = this.setOrderTimes(order);
          if (type === "ki") {
            order = this.setOrderPackaging(order);
          }
          if (feed === "other") {
            obj.other[order.id] = order;
            otherIn = [...otherIn, order.id];
          } else if (feed === "open") {
            obj.open[order.id] = order;
            openIn = [...openIn, order.id];
          }
        }
        return obj;
      }, {open: {}, other: {}});
      return {
        open: {
          ...sortedOrders.open,
          index: openIn,
        },
        other: {
          ...sortedOrders.other,
          index: otherIn,
        }
      }
    } else {
      return null;
    }
  }

  updateOrders(receivedOrders, type) {
    return function(prevState) {
      const {pollTimeout} = prevState;
      const {orders} = prevState;
      const newState = {
        orders: {}
      };
      if (pollTimeout) {
        clearTimeout(pollTimeout);
      }
      if (receivedOrders) {
        const oldOrders = this.checkCancelledDelivered(orders, receivedOrders, type);
        const newOrders = this.filterNewOrders(oldOrders, receivedOrders);
        newState.orders.open = {
          ...oldOrders.open,
          ...newOrders.open,
          index: [...oldOrders.open.index, ...newOrders.open.index],
        };
        newState.orders.other = {
          ...oldOrders.other,
          ...newOrders.other,
          index: [...oldOrders.other.index, ...newOrders.other.index],
        };
      } else {
        newState.orders = orders;
      }
      if (type === "ki") {
        newState.shouldPoll = true;
        newState.pollTimeout = setTimeout(this.fetchOrders, 5000, type);
      }
      return newState;
    }
  }

  checkCancelledDelivered(current, received, type) {
    return Object.keys(current).reduce((obj, key) => {
      obj[key] = Object.keys(current[key]).reduce((o, k) => {
        if (k !== "index") {
          let order = current[key][k];
          let receivedOrder = received.open[order.id] || received.other[order.id];
          if (receivedOrder) {
            if (type === "ki" && receivedOrder.json.address
              && receivedOrder.json.delivered
              && receivedOrder.json.delivered === "true") {
              return o;
            }
          } else {
            order.cancelled = true;
          }
          o[order.id] = order;
          o.index = [...o.index, order.id];
        }
        return o;
      }, {index: []});
      return obj;
    }, {});
  }

  filterNewOrders(old, receivedOrders) {
    return Object.keys(receivedOrders).reduce((obj, key) => {
      obj[key] = Object.keys(receivedOrders[key]).reduce((o,k) => {
        if (k === "index" || old[key][k]) {
          return o;
        } else {
          o[k] = receivedOrders[key][k];
          o.index = [...o.index, parseInt(k)];
          return o;
        }
      }, {index: []})
      return obj;
    }, {});
  }

  orderFeedEval(order, type) {
    if (type === "ki" && (!order.json.delivered || order.json.delivered === "false")) {
      if (order.fulfillment_status === "fulfilled") {
        return "other";
      } else {
        return "open";
      }
    } else if (type === "di") {
      if (order.json.delivered && order.json.delivered === "true") {
        return "other";
      } else {
        return "open";
      }
    } else {
      return null;
    }
  }

  setOrderTimes(order) {
    let placedRaw = new Date(order.created_at), placed, placedUTC, midnight = new Date(),
      midnightUTC, eta, position, deliveryMs = 1500000, asapRaw,
      days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    placedUTC = placedRaw.getTime();
    placed = placedRaw.toLocaleString().split(" ")[1].substring(0,5);
    midnight.setHours(0,0,0,0);
    midnightUTC = midnight.getTime();
    if (order.json.scheduled && order.json.scheduled !== "false") {
      midnight.setSeconds(parseInt(order.json.eta));
      eta = midnight.toLocaleString().split(" ")[1].substring(0,5);
      if (order.json.address) {
        midnight.setMilliseconds(midnight.getMilliseconds() - deliveryMs);
        order.kitchenTime = midnight.toLocaleString().split(" ")[1].substring(0,5);
      }
      position = midnight.getTime() / 1000;
    } else {
      asapRaw = new Date(parseInt(order.json.eta) + midnight.getTime()
        - (this.type === "ki" && order.json.address ? deliveryMs : 0));
      eta = asapRaw.toLocaleString().split(" ")[1].substring(0,5);
      position = parseInt(asapRaw.getTime() / 1000);
    }
    order.created_at_pretty = placed;
    order.eta = eta;
    order.position = position;
    order.placedUTC = placedUTC;
    return order;
  }

  setOrderPackaging(order) {
    let pkg = false;
    for (let i = 0; i < order.line_items.length; i++) {
      if (order.line_items[i].sku === "packaging") {
        pkg = true;
        break;
      }
    }
    order.hasPackaging = pkg;
    return order;
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

  updateOrderRequest(e, args) {
    e.stopPropagation();
    const {
      orderId,
      action,
      feed,
      data,
    } = args;
    const {type, handle, nonce, ajaxurl} = this.props;
    const {orders} = this.state;
    const order = orders[feed][orderId];
    let config = new FormData;
    config.append("store", handle);
    config.append("staff_nonce", nonce);
    config.append("action", type + "_update_order");
    config.append("orderId", orderId);
    if (type === "ki") {
      config.append("notify", order.fulfillments.length ? false : true);
      if (order.fulfillments.length && order.fulfillments[0].status === "success") {
        config.append("fulfillment", order.fulfillments[0].id);
      }
    } else {
      config.append("json", {...order.json, 
        delivered: action === "done" ? true : false
      });
    }
    axios.post(ajaxurl, config)
      .then(response => this.updateOrderResponse(response, feed, orders));
  }

  updateOrderResponse(response, feed, orders) {
    if (response.status === 200) {
      const data = JSON.parse(response.data.body);
      let order;
      if (data.fulfillment) {
        // a fulfillment has either been created or updated, either attach the new fulfillment or
        // update the existing one
        order = orders[feed][data.fulfillment.order_id];
        let newFulfill = [data.fulfillment];
        order.fulfillments.forEach(f => {
          if (f.id !== data.fulfillment.id) {
            newFulfill.push(f);
          }
        });
        order.fulfillments = newFulfill;
      } else {
        const order = orders[feed][data.order.id];
        // JSON has been updated, attach the updated JSON to the existing order
        let updtJson = JSON.parse(data.order.note_attributes[0].value);
        order.json = updtJson;
      }
      this.setState(this.moveOrder(order, feed));
    } else {
      console.log("We got a response back, but there was something wrong with it");
      console.log(response);
    }
  }

  /**
    * Apparently lodash 5 will drop support for omit, come up with a new
    * solution using the keys/reduce method adopted in togglePup below,
    * as well as in checkCancelledDelivered and filterNewOrders further up.
    */

  moveOrder(order, feed) {
    return (prevState) => {
      const {orders} = prevState;
      const {index} = orders[feed];
      const updtdIndex = index.filter((id) => id !== order.id);
      const updtdFeed = omit(orders[feed], order.id.toString());
      const newFeed = (feed => feed === "open" ? "other" : "open")(feed);
      const newIndex = [...orders[newFeed].index, order.id];
      return {
        orders: {
          [feed]: {
            ...updtdFeed,
            index: updtdIndex,
          },
          [newFeed]: {
            ...orders[newFeed],
            index: newIndex,
            [order.id]: order,
          }
        }
      }
    };
  }

  togglePup(pup = false, data = null) {
    this.setState((prevState) => {
      const {popUps} = prevState;
      const updtdPups = Object.keys(popUps).reduce((obj, key) => {
        obj[key] = {
          ...popUps[key],
          open: key === pup,
        };
        return obj;
      }, {});
      if (pup === "driver") {
        updtdPups.driver.current = data;
      }
      return {
        popUps: updtdPups
      }
    });
  }

  stop() {
    const root = document.getElementById('root');
    root.classList.remove("open");
    ReactDOM.unmountComponentAtNode(root);
  }

  restart() {
    // we should store wait time data in KitchenInterface state, and add a method to
    // KitchenInterface's componentDidMount to pull in wait time data fresh each time,
    // otherwise when we restart we're potentially using old data from outside the app
    // before it was initialised.
    this.setState({orders: sampleOrders, activeFeed: "open"});
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount(){
    const {pollTimeout} = this.state;
    if (pollTimeout) {
      clearTimeout(pollTimeout);
    }
    this._isMounted = false;
  }
}

export default App;
