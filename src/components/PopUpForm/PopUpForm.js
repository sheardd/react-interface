import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import PopUpFormList from '../PopUpFormList';
import Button from '../Button';
import './PopUpForm.css';

const PopUpForm = ({id, description, list, orderId}) =>
<form id={id + "-form"}>
  <p>{description}</p>
  <p className="pls-wait-msg">Fetching data, please wait...</p>
  
  <PopUpFormList id={id} list={list} />

  {orderId &&
  	<input type="hidden" name="driver-assign-shopify" id="driver-assign-shopify" value={orderId} />
  }
  <div className="btn-row">
    <Button className="submit-button update">Update</Button>
    <Button className="submit-button cancel">Cancel</Button>
  </div>
</form>

export default PopUpForm;