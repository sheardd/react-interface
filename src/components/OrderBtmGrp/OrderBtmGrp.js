import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import OrderInfo from '../OrderInfo';
import './OrderBtmGrp.css';

const OrderBtmGrp = ({order, type}) => {
  return(
    <div className="order-bottom-group">
      <div className="order-info-container">
        <OrderInfo className="order-notes" title="Notes">{order.json.note}</OrderInfo>
        {type === "ki"?
          <>
            <OrderInfo className="order-customer name" title="Customer:">
              {order.customer.first_name} {order.customer.last_name}, {order.json.address}
            </OrderInfo>
            <OrderInfo className="order-customer number" title="Number:">
              {order.billing_address.phone}
            </OrderInfo>
          </>
        :
          <>
            {order.financial_status !== "paid" ?
              <OrderInfo className="order-customer payment-status" title="To Pay:">
                {"£" + order.total_price}
              </OrderInfo>
            :
              <OrderInfo className="order-customer payment-status" title="-- PAID --"></OrderInfo>
            }
          </>
        }
        <OrderInfo className="order-customer placed" title="Placed At:">
          {order.created_at_pretty}
        </OrderInfo>
        <OrderInfo className="order-customer shopify" title="Shopify ID:">
          {order.order_number}
        </OrderInfo>
        {order.json.driver ?
          <OrderInfo className="order-customer driver" title="Driver:">
          {order.json.driver.toUpperCase()}
        </OrderInfo>
        :
          null
        }
      </div>
    </div>
  );
}
export default OrderBtmGrp;