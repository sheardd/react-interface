import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import PopUp from '../PopUp';
import Nav from '../Nav';
import './DriverInterface.css';

class DriverInterface extends Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.settleOrdersRequest = this.settleOrdersRequest.bind(this);
  }

  render() {
    const {
      activeFeed,
      switchActiveFeed,
      type,
      handle,
      children,
      togglePup,
      popUp,
      stop,
    } = this.props;
    return (
      <div className={type} id="ep-interface">
        <div id="ep-interface-inner">
        { popUp ?
          <PopUp
            popUp={popUp}
            togglePup={togglePup}
            submitCB={this.settleOrdersRequest}/>
        :
          <>
            <Nav
              type={type}
              activeFeed={activeFeed}
              switchActiveFeed={switchActiveFeed}
              stop={stop}
              togglePup={togglePup} />
            {children}
          </>
        }
        </div>
      </div>
    );
  }

  settleOrdersRequest() {
    const {ajaxurl, handle, nonce, togglePup, orders} = this.props;
    let data = new FormData;
    togglePup();
    data.append('action', 'di_settle_orders');
    data.append('store', handle);
    data.append('staff_nonce', nonce);
    data.append('orders', []);
    orders.other.index.forEach(i => {
      data.append('orders[]',
        JSON.stringify({
          id: orders.other[i].id,
          paid: orders.other[i].financial_status === "paid"
        })
      );
    });
    axios.post(ajaxurl,data)
      .then(response => this.settleOrdersResponse(response))
      .catch(response => {
        console.log("raw output", response);
        const {logError} = this.props;
        let finalErr;
        if (response.errors) {
          finalErr = response;
        } else {
          finalErr = {
            context: "settleOrdersRequest",
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
        }
        logError(finalErr);
      });
  }

  settleOrdersResponse(response) {
    const {logError} = this.props;
    return Promise.reject(response);
  }

  componentDidMount() {
    const {fetchOrders} = this.props;
    fetchOrders();
  }
}

export default DriverInterface;