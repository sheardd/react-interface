import React from 'react';
import PropTypes from 'prop-types';
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
    updateOrderRequest,
    togglePup,
  } = props;
  return (
    <div id={id} className={className}>
      {orders[feed].index.map(orderId => {
        const order = orders[feed][orderId];
        return(
          <Order order={order} key={orderId} type={type} feed={feed} toggleOrder={toggleOrder} updateOrderRequest={updateOrderRequest} togglePup={togglePup}/>
        );
      })}
    </div>
  );
}

export default Feed;