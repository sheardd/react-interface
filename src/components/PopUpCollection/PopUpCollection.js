import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import PopUpCollectionMenuItem from '../PopUpCollectionMenuItem';
import './PopUpCollection.css';

const PopUpCollection = ({context, collection, hidden}) =>
  <ul className="pop-up-ul pop-up-collection-list">
    {collection.index.map(i =>
      <li className="pop-up-collection-li" key={collection[i].id}>
        {context === "menu" ?
          <PopUpCollectionMenuItem product={collection[i]} hidden={hidden[i]}/>
        :
          <p>{collection[i].title}: {collection[i].error.code} - {collection[i].error.message}</p>
        }
      </li>
    )}
  </ul>


export default PopUpCollection;
