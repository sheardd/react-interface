import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import './Interface.css';

const Interface = ({type}) =>
  <div className={type} id="ep-interface">
    <div id="ep-interface-inner">
      <h1>I am a kitchen interface</h1>
    </div>
  </div>

export default Interface;