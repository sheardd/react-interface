import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
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