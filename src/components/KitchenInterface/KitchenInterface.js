import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import './KitchenInterface.css';

class KitchenInterface extends Component {
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
    } = this.props;
    return (
      <div className={type} id="ep-interface">
        <div id="ep-interface-inner">
          <h1>I am the kitchen interface for {handle}</h1>
          <p>{type}</p>
          <p>{handle}</p>
          <p>{nonce}</p>
          <p>{store.wait_time}</p>
          <p>{store.wt_updated}</p>
        </div>
      </div>
    );
  }
}

export default KitchenInterface;