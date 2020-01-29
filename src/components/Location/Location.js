import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import './Location.css';

const Location = (props) =>
  <div id='store-indicator' className='bg-grey'>
    <span>{props.children}</span>
  </div>

export default Location;