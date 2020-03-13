import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import OrderTopGrp from '../OrderTopGrp';
import OrderItems from '../OrderItems';
import OrderBtmGrp from '../OrderBtmGrp';
import OrderButtons from '../OrderButtons';
import './Order.css';

const Order = (props) => {
  const {
    order,
    type,
    feed,
    toggleOrder,
    updateOrderRequest,
    togglePup,
  } = props;
  const orderClasses = classNames(
    "order-container",
    {"delivery": order.json.address},
    {"collection": !order.json.address},
    {"scheduled": order.json.scheduled && order.json.scheduled !== "false"},
    {"cancelled": order.cancelled },
    {"cancel-flash": order.cancelled && order.cancelled !== "acknowledged"},
    {"open": order.open},
  );
  return (
    <div
    className={orderClasses}
    style={{order: order.position}}
    onClick={() => toggleOrder(order.id, feed, order.cancelled)}>
      <div className="order-inner">
        <OrderTopGrp order={order} type={type} />
        <OrderItems items={order.json.items} />
        <OrderBtmGrp order={order} type={type}/>
      </div>
      <div className="order-sidebar">
        <div className="order-sidebar-info">
          {order.kitchenTime ? <h3 className="order-customer time">{order.kitchenTime}</h3> : null }
          <h3 className="order-customer time target">{order.eta}</h3>
        </div>
        <OrderButtons
          type={type}
          orderId={order.id}
          feed={feed}
          delivery={order.json.address}
          onTick={updateOrderRequest}
          onDriver={togglePup} />
      </div>
    </div>
  );
}

export default Order;