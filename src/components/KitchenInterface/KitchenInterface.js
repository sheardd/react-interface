import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import PopUp from '../PopUp';
import Nav from '../Nav';
import Status from '../Status';
import './KitchenInterface.css';
import sampleMenu from '../../sample-data/sampleMenu.js';
import sampleDriver from '../../sample-data/sampleDriver.js';
import sampleErrors from '../../sample-data/sampleErrors.js';

class KitchenInterface extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: sampleMenu,
      driver: sampleDriver,
      errors: sampleErrors,
      wait: props.wait,
    };
    this.updateWaitTime = this.updateWaitTime.bind(this);
    this.waitTimeCallback = this.waitTimeCallback.bind(this);
    this.checkPup = this.checkPup.bind(this);
  }

  render() {
    const {
      menu,
      wait,
    } = this.state;
    const {
      popUps,
      activeFeed,
      switchActiveFeed,
      type,
      handle,
      nonce,
      children,
      openPup,
      stop,
      restart,
    } = this.props;
    const pupIsOpen = this.checkPup();

    return (
      <div className={type} id="ep-interface">
        <div id="ep-interface-inner">
        { pupIsOpen ?
          <PopUp {...pupIsOpen} />
        :
          <>
            <Nav
              type={type}
              wait_time={wait.wait_time}
              activeFeed={activeFeed}
              switchActiveFeed={switchActiveFeed}
              updateWaitTime={this.updateWaitTime}
              openPup={openPup}
              stop={stop}
              restart={restart} />
            {children}
            <Status openPup={openPup}/>
          </>
        }
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

  checkPup() {
    const {popUps} = this.props;
    const {menu, driver, errors} = this.state;
    const keys = Object.keys(popUps);
    let result = false;
    for (let i = 0; i < keys.length; i++) {
      if (popUps[keys[i]].open) {
        result = popUps[keys[i]];
        if (result.id === "menu") {
          result.list = menu;
        } else if (result.id === "driver") {
          result.list = driver;
        } else if (result.id === "error") {
          result.list = errors;
        }
        break;
      }
    }
    return result;
  }
}

export default KitchenInterface;