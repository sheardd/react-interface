import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import PopUp from '../PopUp';
import Nav from '../Nav';
import Status from '../Status';
import './DriverInterface.css';

class DriverInterface extends Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  render() {
    const {
      activeFeed,
      shouldPoll,
      switchActiveFeed,
      type,
      handle,
      updateStatus,
      children,
      togglePup,
      popUp,
      settleOrdersRequest,
      stop,
      restart,
    } = this.props;
    const pupCB = popUp ?
      (popUp.id === "settle" ? settleOrdersRequest : restart) : null;
    return (
      <div className={type} id="ep-interface">
        <div id="ep-interface-inner">
        { popUp ?
          <PopUp
            popUp={popUp}
            togglePup={togglePup}
            submitCB={pupCB}/>
        :
          <>
            <Nav
              type={type}
              activeFeed={activeFeed}
              switchActiveFeed={switchActiveFeed}
              stop={stop}
              togglePup={togglePup} />
            {children}
            <Status
              togglePup={togglePup}
              updateStatus={updateStatus}
              type={type}
              shouldPoll={shouldPoll} />
          </>
        }
        </div>
      </div>
    );
  }

  componentDidMount() {
    const {fetchOrders} = this.props;
    fetchOrders();
  }
}

export default DriverInterface;