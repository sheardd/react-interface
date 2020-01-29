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
  return (
    <div
    className="order-container delivery scheduled open"
    data-shopify="2017837580393"
    data-fulfill="1897635446889"
    style={{order: 1580326500}}>
      <div className="order-inner">
        <div className="order-type">
         {/* <h3> DEL/COL </h3>
          PACKAGING? */}
        </div>
        <div className="order-items-container">
          <ul className="order-items-list">
            {/*  Order Items Loop */}
          </ul>
        </div>
        <div className="order-notes-container">
          <p className="order-notes">
            <span className="inline-title">Notes: </span>
            <span className="order-value">{/* Order Note */}</span>
          </p>
        </div>
        <div className="order-supplementary-container">
          <div className="order-info-container">
          {/*  Component this bit (use for order-notes above) */}
            <p className="order-customer name">
              <span className="inline-title">Customer: </span>
              <span className="order-value">{/* Customer Name/Address */}</span>
            </p>
            <p className="order-customer number">
              <span className="inline-title">Number: </span>
              <span className="order-value">{/* Customer Phone */}</span>
            </p>
            <p className="order-customer placed">
              <span className="inline-title">Placed At: </span>
              <span className="order-value">{/* order.created_at */}</span>
            </p>
            <p className="order-id shopify">
              <span className="inline-title">Shopify ID: </span>
              <span className="order-value">{/* Shopify order number*/}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="order-sidebar">
        <div className="order-sidebar-info">
          <h3 className="order-customer time">{/* Order Kitchen time (scheduled orders only) */}</h3>
          <h3 className="order-customer time target">{/* Order eta (always)*/}</h3>
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