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
    updateOrder,
  } = props;
  return (
    <div id={id} className={className}>
      {orders[feed].map(order =>
        <Order order={order} key={order.id} type={type} feed={feed} updateOrder={updateOrder}/>
      )}
    </div>
  );
}

export default Feed;