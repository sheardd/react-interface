import React from 'react';
import PropTypes from 'prop-types';
import './OrderInfo.css';

const OrderInfo = ({
  className,
  title,
  children
}) => 
  <p className={className}>
    <span className="inline-title">{title} </span>
    <span className="order-value">{children}</span>
  </p>

export default OrderInfo;