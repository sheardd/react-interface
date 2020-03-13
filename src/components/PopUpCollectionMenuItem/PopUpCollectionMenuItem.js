import React from 'react';
import PropTypes from 'prop-types';
import './PopUpCollectionMenuItem.css';

const PopUpCollectionMenuItem = ({collection, product, checked, pupSelection, }) =>
  <>
    <input type="checkbox" id={product.id}
      value={product.id} data-tags={product.tags}
      data-collection={product.collection} data-title={product.title}
      checked={checked}
      onChange={() => pupSelection({
        collection, id: product.id,
        checked: checked},
        "menu")}/>
    <label htmlFor={product.id}><p>{product.title}</p></label>
  </>


export default PopUpCollectionMenuItem;
