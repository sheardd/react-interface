import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import './Interface.css';

const Interface = ({
	type,
	handle,
	nonce,
	store,
	orders,
}) =>
  <div className={type} id="ep-interface">
    <div id="ep-interface-inner">
      <h1>I am the kitchen interface for {handle}</h1>
      <p>{type}</p>
      <p>{handle}</p>
      <p>{nonce}</p>
      <p>{store.wait_time}</p>
      <p>{store.wt_updated}</p>
    </div>
  </div>

export default Interface;