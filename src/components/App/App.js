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
      shouldPoll: false,
      activePoll: null,
      pollTimeout: null,
      updateStatus: false,
      errors: {
        index: [],
      },
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
    this.setUpdateStatus = this.setUpdateStatus.bind(this);
    this.logError = this.logError.bind(this);
    this.stop = this.stop.bind(this);
    this.restart = this.restart.bind(this);
  }

  render() {
    const {type, handle, nonce, ajaxurl} = this.props;
    const {wait, activeFeed, orders, errors, popUps, updateStatus} = this.state;
    // console.log(errors);
    return (
      <Interface
      type={type}
      handle={handle}
      nonce={nonce}
      wait={wait}
      orders={orders}
      errors={errors}
      fetchOrders={this.fetchOrders}
      popUps={popUps}
      ajaxurl={ajaxurl}
      activeFeed={activeFeed}
      switchActiveFeed={this.switchActiveFeed}
      togglePup={this.togglePup}
      updateStatus={updateStatus}
      setUpdateStatus={this.setUpdateStatus}
      logError={this.logError}
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
        .then(response => this.parseOrders(response, type),
          error => Promise.reject(error))
        .then(
          orders => {
            if (this._isMounted) {
              this.setState(this.updateOrders(orders, type));
            }
          },
          error => Promise.reject(error))
        .catch(
          error => {
            this.logError(error);
            if (this._isMounted) {
              this.setState({shouldPoll: false});
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
      if (response.data.errors || response.status !== 200
        || response.data.response.code !== 200) {
        if (response.data.errors) {
          reject({errors: response.data.errors, context: "fetchOrdersApi"});
        } else {
          reject({data: response.data.response, context: "fetchOrdersApi"});
        }
      } else {
        try {
          resolve(JSON.parse(response.data.body));
        } catch(error) {
          console.log(error);
          reject({
            data: {
              code: "Invalid Data",
              message: "Response received was not valid JSON"
            },
            context: "fetchOrdersApi",
          });
        }
      }
    });
  }

  parseOrders(response, type) {
    const newOrders = response.orders;
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
      };
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
        newState.pollTimeout = setTimeout(this.fetchOrders, 5000);
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
    this.setUpdateStatus(true);
    axios.post(ajaxurl, config)
      .then(response => this.updateOrderResponse(response, feed, orders),
        error => Promise.reject(error))
      .catch(response => {
        console.log("raw output", response);
        const finalErr = {
          context: "setUpdateStatus",
        };
        if (response.data) {
          if (response.data.errors) {
            finalErr.errors = {...response.data.errors};
          } else {
            finalErr.data = {...response.data.response};
          }
        } else {
          finalErr.data = {
            code: "Unhandled Exception",
            message: response,
          };
        }
        this.logError(finalErr);
      });
  }

  updateOrderResponse(response, feed, orders) {
    if (!response.data.errors && response.status === 200
      && (response.data.response.code === 200 || response.data.response.code === 201)) {
      let data;
      try {
        data = JSON.parse(response.data.body);
      } catch(e) {
        console.log(e);
        return Promise.reject({
          data: {
            code: "Invalid Data",
            message: "Response received was not valid JSON"
          },
          context: "updateOrderResponse",
        });
      }
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
      this.setUpdateStatus("done");
      this.setState(this.moveOrder(order, feed));
    } else {
      return Promise.reject(response);
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
        updtdPups.driver.current = data.orderId;
        updtdPups.driver.context = data.feed;
      }
      return {
        popUps: updtdPups
      }
    });
  }

  setUpdateStatus(status) {
    // WE NEED TO CHECK FOR ERRORS BEFORE SETTING ANY STATUS THAT WILL HIDE THE UPDATE STATUS
    // maybe check if updateStatus is currently set to "error" or if the new status is "error",
    // and if it's coming from the clear log CB then set status to "clear" to override this
    // status and reset to false.
    this.setState(prevState => {
      const hideStatus = () => this.setUpdateStatus(false);
      if (status === "done" && prevState.updateStatus !== "error") {
        setTimeout(hideStatus, 1000);
      }
      return {
        updateStatus: prevState.updateStatus === "error" ? prevState.updateStatus : status
      };
    });
  }

  logError(error) {
    // places to check:
    // - data.errors: generated by axios from a bad request e.g. bad URL, possibly bad connection?
    // - data.data.response: generated by the API we're making the request to (usually shopify). Gives us
    //   a code and a message we can use
    // - data.isArray(): if it's an array of errors caused by several failed requests within a batch (e.g.
    //   a series of menu updates have failed)
    // generate:
    // - a SINGLE new value for error Index (regardless of array, single known or unknown error)
    // - an error code and message for non-arrayed errors
    // - an iteratable object (index/prop structure) for arrayed errors, with each arrayed product containing
    //   product id, title and collection, as well as the error {code and message}
    // - a non-specific error type fallback (this may be already be generated context specifically and can be passed through)
    console.log("Thur's a snake in mah boot", error);
    if (error.errors) {
      console.log("found an array of errors");
    } else if (error.data) {
      error.data.message += " (" + error.context + ")";
      this.setState(prevState => {
        const {errors} = prevState;
        const newIndex = (errors.index.length + 1).toString();
        return {
          updateStatus: "error",
          errors: {
            ...errors,
            index: [
              ...errors.index,
              newIndex,
            ],
            [newIndex]: error.data,
          }
        };
      });
    } else {

    }

  }

  /**
    * Called by
    * driverFetchResponse
    * driverAssignResponse (twice)
    * menuFetchResponse
    * menuUpdateResponse
    *
    * Rewrite both of these functions into a single error function, which calls a supplementary
    * "compileComplexError" function if the current error contains multiple
    * errors (such as when updating the menu or settling orders in DI), then simply pushes the final
    * error object (be it simple or complex) to the errors object in state.
    * remember when doing this that you may need to account for request fails as well as response fails,
    * either within this function or by creating an object to pass to this function. "Non-specific Error"
    * may already be covering this though.
    */
  // updateGeneralFail(data, context) {
  //     let code, message;
  //     if (data && data.errors) {
  //       let errorsArr = [];
  //       // rewrite this so we're not setting state over and over, as updateFail will
  //       // ultimately end up as a state update.
  //       $.each(data.errors, function(error, arr){
  //         that.updateFail({
  //           "message" : arr[0],
  //           "code": error
  //         }, context);
  //         return false;
  //       });
  //     } else {
  //       code = "Non-Specific Error";
  //       message = "It is probable that either the internet is down or the website's " +
  //         "server is. Check the interface is still connected to the network, that the " +
  //         "network still has internet, and that you can log into the Website's Admin " +
  //         "Area.";
  //       that.updateFail({
  //         "message": message,
  //         "code": code
  //       }, context);
  //     }
  //   }

  //   /** Called by:
  //     * menuUpdateResponse (again)
  //     * updateGeneralFail
         // * Rewrite both of these functions into a single error function, which calls a supplementary
         // * "compileComplexError" function if the current error contains multiple
         // * errors (such as when updating the menu or settling orders in DI), then simply pushes the final
         // * error object (be it simple or complex) to the errors object in state.
  //     */
  //   updateFail(error, context) {
  //     // we could perhaps consider centralizing all setUpdateStatus("error") calls by moving them here
  //     // this.updateStatus("error");
  //     // errorsinLog may be superceded by check in setUpdateStatus
  //     // this.errorsInLog = true;
  //     // add these to 
  //     if (context === "menu-fetch" && !Array.isArray(error)) {
  //       // this.dom.find("#menu-update .pls-wait-msg").text(error.code + ": " + error.message);
  //     } else if (context === "driver-fetch") {
  //       // this.dom.find("#driver-assign .pls-wait-msg").addClass("error")
  //       //   .text(error.code + ": " + error.message);
  //     }
  //     this.renderLogError(error, context);
  //     return;
  //   }

    // renderLogError(error, context) {
    //   let errorCnt = this.dom.find("#error-container"),
    //     errorLog = errorCnt.find("#error-log"),
    //     msgContext, errorLi = $("<li class='error-log-item'></li>"),
    //     signoff = "Please ensure you are connected to the internet and that your Shopify "
    //       + "credentials are valid. If the problem persists, please contact the developer "
    //       + "as soon as possible.";
    //   if (context.indexOf("menu") !== -1) {
    //     signoff += " If you have recently made product "
    //       + "updates on Shopify, please try reloading this page and updating again. "
    //       + "You can also look up products on Shopify (Shopify > Products) and manually "
    //       + "update them by checking the box beside the product, then selecting Actions > "
    //       + "Make Products Available/Unavailable.";
    //   }
    //   if (Array.isArray(error)) {
    //     if (context === "menu-submit") {
    //       msgContext = "Encountered errors updating the following products.";
    //     }
    //     errorLi.html("<p>" + msgContext + "</p>");
    //     let errorUl = $("<ul class='error-list'></ul>");
    //     error.forEach(function(errorObj){
    //       errorUl.append("<li class='error-list-item'>" + errorObj.title
    //         + ": " + errorObj.error.message + " (" + errorObj.error.code + ")</li>");
    //     });
    //     errorLi.append(errorUl);
    //   } else {
    //     if (context === "driver-fetch") {
    //       msgContext = "Encountered a problem when fetching drivers to assign";
    //     } else if (context === "driver-submit") {
    //       msgContext = "Encountered a problem when assigning a driver";
    //     } else if (context === "menu-fetch") {
    //       msgContext = "Encountered a problem when fetching the menu";
    //     }
    //     errorLi.html("<p>" + msgContext + " - " + error.code + ": " + error.message + "</p>");
    //   }
    //   errorLi.append("<p>" + signoff + "</p>");
    //   errorLog.append(errorLi);
    //   return;
    // }

  stop() {
    const root = document.getElementById('root');
    root.classList.remove("open");
    ReactDOM.unmountComponentAtNode(root);
  }

  restart() {
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
