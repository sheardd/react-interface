import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import OrderInfo from '../OrderInfo';
import './OrderInfoGrp.css';

const OrderInfoGrp = ({order}) =>
  <div className="order-supplementary-container">
    <div className="order-info-container">
      <OrderInfo className="order-notes" title="Notes">{order.json.note}</OrderInfo>
      <OrderInfo className="order-customer name" title="Customer">
        {order.customer.first_name} {order.customer.last_name}, {order.json.address}
      </OrderInfo>
      <OrderInfo className="order-customer number" title="Number">
        {order.billing_address.phone}
      </OrderInfo>
      <OrderInfo className="order-customer placed" title="Placed At">
        {order.created_at_pretty}
      </OrderInfo>
      <OrderInfo className="order-customer shopify" title="Shopify ID">
        {order.order_number}
      </OrderInfo>
    </div>
  </div>

export default OrderInfoGrp;