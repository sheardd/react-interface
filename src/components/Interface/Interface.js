import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import KitchenInterface from '../KitchenInterface'
import DriverInterface from '../DriverInterface'
import './Interface.css';

/**
  * Develop this at some point to have error handling (otherwise any type is valid
  * to some degree and just falls back to DriverInterface)
  */

const Interface = (props) =>
  props.type === "ki"
  ? <KitchenInterface {...props} />
  : <DriverInterface {...props} />

export default Interface;