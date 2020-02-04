import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import PopUpCollectionItem from '../PopUpCollectionItem';
import './PopUpCollection.css';

const PopUpCollection = ({collection, title, hidden}) =>
  <div className="pop-up-li-component">
  	<label><h3 className="pop-up-li-title">{title.toUpperCase()}</h3></label>
    <ul className="pop-up-collection-list">
      {collection.index.map(i =>
        <PopUpCollectionItem product={collection[i]} key={collection[i].id} hidden={hidden[i]}/>
      )}
    </ul>
  </div>


export default PopUpCollection;
