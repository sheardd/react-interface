import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import Nav from '../Nav';
import Status from '../Status';
import './KitchenInterface.css';

class KitchenInterface extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: props.orders,
      wait: props.wait,
    };

    this.updateWaitTime = this.updateWaitTime.bind(this);
    this.waitTimeCallback = this.waitTimeCallback.bind(this);
  }

  render() {
    const {
      wait,
      orders,
    } = this.state;
    const {
      activeFeed,
      switchFeed,
      type,
      handle,
      nonce,
      children,
    } = this.props;
    return (
      <div className={type} id="ep-interface">
        <div id="ep-interface-inner">
        <Nav
          type={type}
          wait_time={wait.wait_time}
          activeFeed={activeFeed}
          switchFeed={switchFeed}
          updateWaitTime={this.updateWaitTime} />
        {children}
        <Status />
        </div>
      </div>
    );
  }

  updateWaitTime(time) {
    // $.post(
    //   ajaxurl,
    //   {
    //     "action": "ki_update_wait_time",
    //     "store": this.wait,
    //     "staff_nonce": this.ep.staff_nonce,
    //     "time": time
    //   },
    //   this.waitTimeCallback()
    // );
    this.waitTimeCallback(time);
  }

  /**
   *  Evaluates the response to updateWaitTime
   *  Assuming we have data, update the current store's
   *  wait time and wt_updated properties with the newly
   *  returned values, update the wait time value displayed
   *  in the interface, restart the timer, and remove bg-red
   *  from the wait timer buttons (if it's there).
   */
  waitTimeCallback(time) {
  //   const that = this;
  //   return function(data, textStatus, jqXHR){
  //     if (data) {
  //       ep.stores[that.store].wait_time = data.time;
  //       ep.stores[that.store].wt_updated = data.at;
  //       that.dom.find(".wait-time .current-wait-time").text("+" + data.time);
  //       that.waitTimeUpdated = data.at;
  //       that.startWaitTimer();
  //       that.dom.find("#int-nav-wait").removeClass("bg-red");
  //     }
  //   }
    const {wait} = this.state;
    const newWait = {
      wt_updated: 0,
      wait_time: time
    }
    this.setState({wait: newWait});
  }
}

export default KitchenInterface;