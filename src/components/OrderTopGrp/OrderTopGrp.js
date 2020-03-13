import React from 'react';
import PropTypes from 'prop-types';
import OrderInfo from '../OrderInfo';
import './OrderTopGrp.css';

const OrderTopGrp = ({order, type}) => {
  return(
  	<div className="order-top-group">
      {type === "ki" ?
        <>
          {order.json.address ? <h3>DEL</h3> : <h3>COL</h3>}
          {order.hasPackaging ? <h3 className="packaging">PACKAGING</h3> : null}
        </>
      :
      	<div className="order-info-container">
          <OrderInfo className="order-customer name" title="Customer:">
            {order.customer.first_name} {order.customer.last_name}, {order.json.address}
          </OrderInfo>     
          <OrderInfo className="order-customer number" title="Number:">
            {order.billing_address.phone}
          </OrderInfo>
        </div>
      }
    </div>
  );
}

export default OrderTopGrp;