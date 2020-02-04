import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import PopUpFormList from '../PopUpFormList';
import Button from '../Button';
import './PopUpForm.css';

const PopUpForm = ({id, description, list}) =>
<form id={id + "-form"}>
  <p>{description}</p>
  {list ?
    <PopUpFormList id={id} list={list} />
  :
    <p className="pls-wait-msg">Fetching data, please wait...</p>
  }


  {list.current &&
    <input type="hidden" name="driver-assign-shopify" id="driver-assign-shopify" value={list.current} />
  }
  <div className="btn-row">
    <Button className="submit-button update">{id === "error" ? "Clear Log" : "Update"}</Button>
    <Button className="submit-button cancel">Cancel</Button>
  </div>
</form>

export default PopUpForm;