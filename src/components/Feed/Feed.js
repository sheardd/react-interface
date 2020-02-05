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
    togglePup,
  } = props;
  return (
    <div id={id} className={className}>
      {orders[feed].index.map(orderId => {
        const order = orders[feed][orderId];
        return(
          <Order order={order} key={orderId} type={type} feed={feed} toggleOrder={toggleOrder} updateOrder={updateOrder} togglePup={togglePup}/>
        );
      })}
    </div>
  );
}

export default Feed;