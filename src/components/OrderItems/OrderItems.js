import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import LineItemWrapper from '../LineItemWrapper';
import './OrderItems.css';

const OrderItems = ({items}) =>
  <div className="order-items-container">
    <ul className="order-items-list">
      {items.map((item) =>
        item.shortname !== "delivery" && item.shortname !== "packaging" ?
          <LineItemWrapper item={item} key={item.variant}/>
        :
          null
      )}
    </ul>
  </div>

export default OrderItems;