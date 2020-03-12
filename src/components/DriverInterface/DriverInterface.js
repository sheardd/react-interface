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
    this.settleOrders = this.settleOrders.bind(this);
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
            submitCB={this.settleOrders()}/>
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

  settleOrders() {
    console.log("yu gaht it bawss");
  }

  componentDidMount() {
    const {fetchOrders} = this.props;
    fetchOrders();
  }
}

export default DriverInterface;