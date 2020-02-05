import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import Order from '../Order';
import './Feed.css';

const Feed = (props) => {
  const {
    id,
    className,
    feed,
    orders,
    type,
    toggleOrder,
    updateOrder,
    openPup,
  } = props;
  return (
    <div id={id} className={className}>
      {orders[feed].index.map(orderId => {
        const order = orders[feed][orderId];
        return(
          <Order order={order} key={orderId} type={type} feed={feed} toggleOrder={toggleOrder} updateOrder={updateOrder} openPup={openPup}/>
        );
      })}
    </div>
  );
}

export default Feed;