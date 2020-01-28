import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
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
      type,
      handle,
      nonce,
      children,
    } = this.props;
    return (
      <div className={type} id="ep-interface">
        <div id="ep-interface-inner">
          {children}
        </div>
      </div>
    );
  }
}

export default DriverInterface;