import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import './PopUpFormListItem.css';

const PopUpFormListItem = ({children, ...rest}) =>
  <li>{children}</li>


export default PopUpFormListItem;