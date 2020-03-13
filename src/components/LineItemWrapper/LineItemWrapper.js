import React from 'react';
import PropTypes from 'prop-types';
import LineItem from '../LineItem';
import './LineItemWrapper.css';

const LineItemWrapper = ({item}) =>
  <LineItem className="order-item">
    {item.shortname}
    {item.extras && item.extras.length > 0 ?
      <ul className="order-item-extras-list">
        {item.extras.map((extra) =>
          <LineItem className="order-item-extra" key={extra.variant}>
            {extra.shortname}
          </LineItem>
        )}
      </ul>
    :
      null
    }
  </LineItem>

export default LineItemWrapper;