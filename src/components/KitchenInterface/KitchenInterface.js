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
      wait: {
        wt_updated: null,
        wait_time: 0,
      },
      waitTimer: null
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.initWaitTimer = this.initWaitTimer.bind(this);
    this.startWaitTimer = this.startWaitTimer.bind(this);
    this.waitTimerExpired = this.waitTimerExpired.bind(this);
    this.updateWaitTime = this.updateWaitTime.bind(this);
    this.waitTimeCallback = this.waitTimeCallback.bind(this);
    this.checkPup = this.checkPup.bind(this);
  }

  render() {
    const {
      menu,
      wait,
      waitTimer,
    } = this.state;
    const {
      popUps,
      activeFeed,
      switchActiveFeed,
      type,
      handle,
      nonce,
      children,
      togglePup,
      stop,
      restart,
    } = this.props;
    const pupIsOpen = this.checkPup();

    return (
      <div className={type} id="ep-interface">
        <div id="ep-interface-inner">
        { pupIsOpen ?
          <PopUp popUp={pupIsOpen} togglePup={togglePup}/>
        :
          <>
            <Nav
              type={type}
              waitTimer={waitTimer}
              wait_time={wait.wait_time}
              activeFeed={activeFeed}
              switchActiveFeed={switchActiveFeed}
              updateWaitTime={this.updateWaitTime}
              togglePup={togglePup}
              stop={stop}
              restart={restart} />
            {children}
            <Status togglePup={togglePup}/>
          </>
        }
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.initWaitTimer();
  }

  initWaitTimer() {
    const {wt_updated} = this.state.wait;
    const {ajaxurl, handle, nonce} = this.props;
    if (wt_updated) {
      let now = Date.now(),
        sinceUpdate = now - wt_updated;
      if (sinceUpdate < 1200000) {
        this.startWaitTimer(1200000 - sinceUpdate);
        return;
      }
      this.waitTimerExpired(this);
    } else {
      axios.get(
        ajaxurl,
        {
          params: {
            action: "ki_fetch_wait_time",
            staff_nonce: nonce,
            store: handle,
          }
        }
      ).then(
        response => {
          this.setState(
            {
              wait: {
                wt_updated: parseInt(response.data.wait.wt_updated),
                wait_time: parseInt(response.data.wait.wait_time),
              }
            },
            this.initWaitTimer
          )
        }
      );
    }
  }

  /**
   * Starts the wait timer:
   *  - By default, starts with fifteen minutes on the timer,
   *    unless another value is given.
   *  - Clears any existing timer and removes bg-red from the wait time
   *    buttons to reset before running.
   *  - Sets a new timer with the given time value, and assigns it to
   *    the interface under the waitTimer property for later reference.
   *  - When the timer expires, run waitTimerExpired.
   */
  startWaitTimer(time = 1200000){
    const {waitTimer} = this.state;
    const that = this;
    if (waitTimer) {
      clearTimeout(waitTimer);
    }
    // this.dom.find("#int-nav-wait").removeClass("bg-red");
    this.waitTimer = setTimeout(function(){that.waitTimerExpired(that);}, time);
    this.setState({
      waitTimer: setTimeout(() => that.waitTimerExpired(that), time)
    });
  }

  /**
   * Timeout callback to demonstrate that it has been more than fifteen minutes
   * since wait time was last updated by turning the wait time buttons red, in
   * order to prompt a more recent update.
   */
  waitTimerExpired(that) {
    // that.dom.find("#int-nav-wait").addClass("bg-red");
    this.setState({
      waitTimer: null
    });
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
    const {ajaxurl, handle, nonce} = this.props;
    axios.post(
      ajaxurl,
      {
        "action": "ki_update_wait_time",
        "store": handle,
        "staff_nonce": nonce,
        "time": time
      }
    ).then(this.waitTimeCallback());
    
  }

  /**
   *  Evaluates the response to updateWaitTime
   *  Assuming we have data, update the current store's
   *  wait time and wt_updated properties with the newly
   *  returned values, update the wait time value displayed
   *  in the interface, restart the timer, and remove bg-red
   *  from the wait timer buttons (if it's there).
   */
  waitTimeCallback() {
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
  return function (data) {
      const {wait} = this.state;
      const newWait = {
        wt_updated: 0,
        wait_time: data
      }
      this.setState({wait: newWait});
    }
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