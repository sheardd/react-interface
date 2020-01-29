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
  } = props;
  return (
    <div id={id} className={className}>
      {orders[feed].map(order =>
        <Order order={order} />
      )}
    </div>
  );
}

export default Feed;