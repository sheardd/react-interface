import React from 'react';
import PropTypes from 'prop-types';
import KitchenInterface from '../KitchenInterface'
import DriverInterface from '../DriverInterface'
import './Interface.css';

const Interface = (props) =>
  props.type === "ki"
  ? <KitchenInterface {...props} />
  : <DriverInterface {...props} />

export default Interface;