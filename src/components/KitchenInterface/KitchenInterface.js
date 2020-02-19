import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import PopUp from '../PopUp';
import Nav from '../Nav';
import Status from '../Status';
import './KitchenInterface.css';
import sampleDriver from '../../sample-data/sampleDriver.js';
import sampleErrors from '../../sample-data/sampleErrors.js';

/* Move all PopUp state (containing temporary form values) up to here, 
(most likely including related methods) */

class KitchenInterface extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pupData: null,
      menu: null,
      driver: sampleDriver,
      errors: sampleErrors,
      wait: {
        wt_updated: null,
        wait_time: 0,
      },
      waitTimer: null
    };
    this.componentDidMount = this.componentDidMount.bind(this);
    this.menuFetchRequest = this.menuFetchRequest.bind(this);
    this.menuFetchResponse = this.menuFetchResponse.bind(this);
    this.initWaitTimer = this.initWaitTimer.bind(this);
    this.startWaitTimer = this.startWaitTimer.bind(this);
    this.waitTimerExpired = this.waitTimerExpired.bind(this);
    this.updateWaitTime = this.updateWaitTime.bind(this);
    this.checkPup = this.checkPup.bind(this);
    this.pupSelection = this.pupSelection.bind(this);
    this.updatePupSelection = this.updatePupSelection.bind(this);
    this.menuUpdateRequest = this.menuUpdateRequest.bind(this);
    this.menuUpdateResponse = this.menuUpdateResponse.bind(this);
  }

  render() {
    const {
      pupData,
      menu,
      wait,
      waitTimer,
    } = this.state;
    const {
      activeFeed,
      switchActiveFeed,
      type,
      handle,
      nonce,
      children,
      togglePup,
      pupSelection,
      stop,
      restart,
    } = this.props;
    const pupIsOpen = this.checkPup();
    return (
      <div className={type} id="ep-interface">
        <div id="ep-interface-inner">
        { pupIsOpen ?
          <PopUp
            popUp={pupIsOpen}
            togglePup={togglePup}
            pupData={pupData}
            pupSelection={this.pupSelection}
            fetchMenu={this.menuFetchRequest}
            submitCB={this.pupSubmitCB(pupIsOpen)}/>
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
    const {fetchOrders} = this.props;
    const {menu} = this.state;
    const pupIsOpen = this.checkPup();
    this.initWaitTimer();
    fetchOrders(true);
  }

  menuFetchRequest() {
    const {ajaxurl, handle, nonce} = this.props;
    axios.get(
      ajaxurl,
      {
        params: {
          "action": "ki_menu_fetch",
          "store": handle,
          "staff_nonce": nonce,
        }
      }).then(response => this.menuFetchResponse(response));
  }

  menuFetchResponse(response) {
    const data = response.data;
    if (!data.errors && data.index.length) {
      this.setState(prevState => {
        const newState = {
          pupData : {},
          menu: data,
        };
        ["hiding", "revealing"].forEach(candidates => {
          newState.pupData[candidates] = Object.keys(data).reduce((obj,key) => {
              if (key !== "hidden" && key !== "index") {
                obj[key] = [];
              }
              return obj;
            }, {});
        });
        return newState;
      });
    } else {
      const empty = {
        "errors": {
           "No Products" : ["No products retrieved. Either none "
             + "exist or your Shopify API credentials are invalid. "
             + "Please check them credentials and try again."]
         }
      };
      const fail = data.errors ? data : empty;
      // (that.updateGeneralFail("menu-fetch"))(fail);
      console.log(fail);
    }
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
    this.setState({
      waitTimer: null
    });
  }

  updateWaitTime(time) {
    const {ajaxurl, handle, nonce} = this.props;
    let data = new FormData;
    data.append('action', 'ki_update_wait_time');
    data.append('store', handle);
    data.append('staff_nonce', nonce);
    data.append('time', time);
    axios.post(
      ajaxurl,
      data
    ).then(response => {
      const {wait} = this.state;
      this.setState({
        wait: {
          wt_updated: response.data.wait.wt_updated,
          wait_time: response.data.wait.wait_time
        }
      },
      this.startWaitTimer
      );
    });
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

  pupSelection(update, context) {
    this.setState(this.updatePupSelection(update,context));
  }

  /* Hiding processed correctly but is either not being stored in state properly or 
  our components are checking for hide in the wrong place (probably the latter)
  Items that have been previously hard-hidden and whose values are not present in pupData
  throw "Cannot read property 'dips' of undefined" (both the dips in question are hidden on render currently) */

  updatePupSelection(update, context) {
    return (prevState) => {
      const {pupData, menu} = prevState;
      const updateTarget = update.checked ? "hiding" : "revealing";
      const otherTarget = update.checked ? "revealing" : "hiding";
      const newData = {
        pupData: {}
      };
      if (context === "menu") {
        let updateArray = pupData[updateTarget][update.collection];
        let otherArray = pupData[otherTarget][update.collection];
        if (otherArray.indexOf(update.id) !== -1) {
          otherArray = otherArray.filter(i => i !== update.id);
          newData.pupData[otherTarget] = {
            ...pupData[otherTarget],
            [update.collection]: otherArray
          }
          newData.pupData[updateTarget] = {...pupData[updateTarget]};
        } else {
          newData.pupData[otherTarget] = {...pupData[otherTarget]};
          updateArray = [...updateArray, update.id];
          newData.pupData = {
            ...newData.pupData,
            [updateTarget]: {
              ...pupData[updateTarget],
              [update.collection]: updateArray
            }
          }
        }
      } else {
        newData.pupData = {
          driver: update
        }
      }
      return newData;
    }
  }

  pupSubmitCB(pup) {
    if (pup.id === "menu") {
      return this.menuUpdateRequest;
    } else {
      return null;
    }
  }

  menuUpdateRequest() {
    const {ajaxurl, handle, nonce} = this.props;
    const {menu, pupData} = this.state;
    const products = {
      hiding: {},
      revealing: {}
    }
    let data = new FormData;
    data.append('action', 'ki_menu_update');
    data.append('store', handle);
    data.append('staff_nonce', nonce);
    ["hiding", "revealing"].forEach(key => {
      Object.keys(pupData[key]).forEach(collection => {
        pupData[key][collection].forEach(id => {
          products[key][id] = menu[collection][id];
        });
      });
    });
    data.append("hiding", JSON.stringify(products.hiding));
    data.append("revealing", JSON.stringify(products.revealing));
    axios.post(
      ajaxurl,
      data
    ).then(response => this.menuUpdateResponse(response));
  }

  menuUpdateResponse(response) {
    console.log(response);
  }
}

export default KitchenInterface;