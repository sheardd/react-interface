import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import './Interface.css';

const Interface = ({type,store,nonce}) =>
  <div className={type} id="ep-interface">
    <div id="ep-interface-inner">
      <h1>I am the kitchen interface for {store.handle}</h1>
      <p>{type}</p>
      <p>{store.handle}</p>
      <p>{nonce}</p>
    </div>
  </div>

export default Interface;