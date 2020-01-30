import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import Button from '../Button';
import './OrderButtons.css';

const OrderButtons = ({type, orderId, feed, onClick}) => {
  return (
    <div className="buttons-container outer">
      {type === "ki" ?
        <>
        <div className="buttons-container top">
          <Button className="order-button order-print bg-grey" onClick={() => onClick({orderId: orderId, action: "print"})} >
            <span className="fas fa-print"></span>
          </Button>
          {feed === "open" ?
            <Button className="order-button order-complete bg-grey" onClick={() => onClick({orderId: orderId, action: "done"})} >
              <span className="fas fa-check"></span>
            </Button>
          :
            <Button className="order-button order-undo bg-grey" onClick={() => onClick({orderId: orderId, action: "revert"})} >
              <span className="fas fa-undo"></span>
            </Button>
          }
        </div>
        <div className="buttons-container bottom">
          <Button className="order-button order-driver bg-grey" onClick={() => onClick({orderId: orderId, action: "driver"})} >
            <span className="fas fa-motorcycle"></span>
          </Button>
        </div>
        </>
      :
        <div className="buttons-container bottom">
          {feed === "open" ?
            <Button className="order-button order-complete bg-grey" onClick={() => onClick({orderId: orderId, action: "done"})} >
              <span className="fas fa-check"></span>
            </Button>
          :
            <Button className="order-button order-undo bg-grey" onClick={() => onClick({orderId: orderId, action: "revert"})} >
              <span className="fas fa-undo"></span>
            </Button>
          }
        </div>
      }
    </div>
  );
}

export default OrderButtons;