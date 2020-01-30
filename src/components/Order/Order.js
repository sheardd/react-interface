import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import OrderInfoGrp from '../OrderInfoGrp';
import OrderButtons from '../OrderButtons';
import './Order.css';

const Order = (props) => {
  const {
    order,
    type,
    feed,
    updateOrder,
  } = props;
  /**
    * Determine order container classes:
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
        <OrderInfoGrp order={order} />
      </div>
      <div className="order-sidebar">
        <div className="order-sidebar-info">
          {order.kitchenTime ? <h3 className="order-customer time">{order.kitchenTime}</h3> : null}
          <h3 className="order-customer time target">{order.eta}</h3>
        </div>
        <OrderButtons type={type} orderId={order.id} feed={feed} onClick={updateOrder}/>
      </div>
    </div>
  );
}

export default Order;