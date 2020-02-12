import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import Nav from '../Nav';
import './DriverInterface.css';

class DriverInterface extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      activeFeed,
      switchActiveFeed,
      type,
      handle,
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

  componentDidMount() {
    const {fetchOrders} = this.props;
    (fetchOrders())("di");
  }
}

export default DriverInterface;