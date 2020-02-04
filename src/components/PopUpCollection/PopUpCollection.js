import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import PopUpCollectionItem from '../PopUpCollectionItem';
import './PopUpCollection.css';

const PopUpCollection = ({collection, hidden}) =>
  <ul className="pop-up-ul pop-up-collection-list">
    {collection.index.map(i =>
      <PopUpCollectionItem product={collection[i]} key={collection[i].id} hidden={hidden[i]}/>
    )}
  </ul>


export default PopUpCollection;
