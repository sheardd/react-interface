import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({id, value, onClick, className, children}) =>
  <button
    id={id}
    value={value}
    onClick={onClick}
    className={className}
    type="button"
    >
    {children}
  </button>

export default Button;