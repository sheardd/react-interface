import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import Nav from '../Nav';
import './DriverInterface.css';

class DriverInterface extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: props.orders,
      store: props.store,
    };
  }

  render() {
    const {
      store,
      orders,
    } = this.state;
    const {
      activeFeed,
      switchActiveFeed,
      type,
      handle,
      nonce,
      children,
      stop,
    } = this.props;
    return (
      <div className={type} id="ep-interface">
        <div id="ep-interface-inner">
          <Nav
            type={type}
            activeFeed={activeFeed}
            switchActiveFeed={switchActiveFeed}
            stop={stop} />
          {children}
        </div>
      </div>
    );
  }
}

export default DriverInterface;