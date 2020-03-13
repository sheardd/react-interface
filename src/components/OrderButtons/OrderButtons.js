import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import Button from '../Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint, faCheck, faUndo, faMotorcycle } from '@fortawesome/free-solid-svg-icons'
import './OrderButtons.css';

const OrderButtons = ({type, orderId, feed, delivery, onTick, onDriver}) => {
  return (
    <div className="buttons-container outer">
      {type === "ki" ?
        <>
        <div className="buttons-container top">
          <Button className="order-button order-print bg-grey" onClick={(e) => onTick(e, {orderId: orderId, action: "print", feed: feed})} >
            <FontAwesomeIcon icon={faPrint} />
          </Button>
          {feed === "open" ?
            <Button className="order-button order-complete bg-grey" onClick={(e) => onTick(e, {orderId: orderId, action: "done", feed: feed})} >
              <FontAwesomeIcon icon={faCheck} />
            </Button>
          :
            <Button className="order-button order-undo bg-grey" onClick={(e) => onTick(e, {orderId: orderId, action: "revert", feed: feed})} >
              <FontAwesomeIcon icon={faUndo} />
            </Button>
          }
        </div>
        <div className="buttons-container bottom">
        {delivery &&
          <Button className="order-button order-driver bg-grey" onClick={(e) => {e.stopPropagation(); onDriver("driver", {orderId, feed});}} >
            <FontAwesomeIcon icon={faMotorcycle} />
          </Button>
        }
        </div>
        </>
      :
        <div className="buttons-container bottom">
          {feed === "open" ?
            <Button className="order-button order-complete bg-grey" onClick={(e) => onTick(e, {orderId: orderId, action: "done", feed: feed})} >
              <FontAwesomeIcon icon={faCheck} />
            </Button>
          :
            <Button className="order-button order-undo bg-grey" onClick={(e) => onTick(e, {orderId: orderId, action: "revert", feed: feed})} >
              <FontAwesomeIcon icon={faUndo} />
            </Button>
          }
        </div>
      }
    </div>
  );
}

export default OrderButtons;