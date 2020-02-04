import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import PopUpForm from '../PopUpForm';
import './PopUp.css';

const PopUp = ({id, description, list}) =>
  <div id={id} className="pop-up bg-grey">
    <div id={id + "-inner"} className="pop-up-inner">
      <PopUpForm id={id} description={description} list={list} />
    </div>
  </div>

export default PopUp;