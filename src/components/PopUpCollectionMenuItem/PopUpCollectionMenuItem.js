import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import './PopUpCollectionMenuItem.css';

/**
  * The input box needs an onChange handler; React disables checkboxes that don't have
  * one (presumably to ensure that you write a handler that updates the state with the
  * check value)
  */

const PopUpCollectionMenuItem = ({collection, product, checked, pupSelection, }) =>
  <>
    <input type="checkbox" id={product.id}
      value={product.id} data-tags={product.tags}
      data-collection={product.collection} data-title={product.title}
      checked={checked ? false : true} onChange={() => pupSelection({collection: collection, id: product.id}, "menu")}/>
    <label htmlFor={product.id}><p>{product.title}</p></label>
  </>


export default PopUpCollectionMenuItem;
