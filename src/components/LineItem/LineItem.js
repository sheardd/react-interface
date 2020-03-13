import React from 'react';
import PropTypes from 'prop-types';
import './LineItem.css';

const LineItem = ({className, children}) => {
  return(
    <li className={className}>
      {children}
    </li>
  );
}

export default LineItem;