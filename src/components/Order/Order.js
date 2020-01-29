import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import './Order.css';

const Order = (props) => {
  const {
    order,
  } = props;
  /**
    * Determine order container classes:
    * - delivery/collection?
    * - scheduled?
    * - open?
    * - cancelled?
    */
  const orderClasses = classNames(
    "order-container",
    {"delivery": order.json.address},
    {"collection": !order.json.address},
    {"scheduled": order.json.scheduled && order.json.scheduled !== "false"},
    {"cancelled": order.cancelled},
    {"open": order.open},
  );
  console.log(order);
  return (
    <div
    className={orderClasses}
    data-shopify={order.id}
    data-fulfill={order.fulfillments[0].id}
    style={{order: order.position}}>
      <div className="order-inner">
        <div className="order-type">
          {order.json.address ? <h3>DEL</h3> : <h3>COL</h3>}
          {order.hasPackaging ? <h3 className="packaging">PACKAGING</h3> : null}
        </div>
        <div className="order-items-container">
          <ul className="order-items-list">
            {/*  Order Items Loop */}
          </ul>
        </div>
        <div className="order-notes-container">
          <p className="order-notes">
            <span className="inline-title">Notes: </span>
            <span className="order-value">{order.json.note}</span>
          </p>
        </div>
        <div className="order-supplementary-container">
          <div className="order-info-container">
          {/*  Component this bit (use for order-notes above) */}
            <p className="order-customer name">
              <span className="inline-title">Customer: </span>
              <span className="order-value">
                {order.customer.first_name} {order.customer.last_name}, {order.json.address}
              </span>
            </p>
            <p className="order-customer number">
              <span className="inline-title">Number: </span>
              <span className="order-value">{order.billing_address.phone}</span>
            </p>
            <p className="order-customer placed">
              <span className="inline-title">Placed At: </span>
              <span className="order-value">{order.created_at_pretty}</span>
            </p>
            <p className="order-id shopify">
              <span className="inline-title">Shopify ID: </span>
              <span className="order-value">{order.order_number}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="order-sidebar">
        <div className="order-sidebar-info">
          <h3 className="order-customer time">{order.kitchenTime}</h3>
          <h3 className="order-customer time target">{order.eta}</h3>
        </div>
        {/*  make a ButtonGrp Component */}
        <div className="buttons-container top">
          <button className="order-button order-print bg-grey"><span className="fas fa-print"></span></button>
          <button className="order-button order-complete bg-grey"><span className="fas fa-check"></span></button>
          <button className="order-button order-undo bg-grey"><span className="fas fa-undo"></span></button>
        </div>
        <div className="buttons-container bottom">
          <button className="order-button order-driver bg-grey"><span className="fas fa-motorcycle"></span></button>
        </div>
      </div>
    </div>
  );
}

export default Order;