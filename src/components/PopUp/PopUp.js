import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import PopUpForm from '../PopUpForm';
import './PopUp.css';

const PopUp = ({popup, togglePup}) =>
  <div id={popup.id} className="pop-up bg-grey">
    <div id={popup.id + "-inner"} className="pop-up-inner">
      <PopUpForm id={popup.id} description={popup.description} list={popup.list} togglePup={togglePup}/>
    </div>
  </div>

export default PopUp;