import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import PopUpCollectionMenuItem from '../PopUpCollectionMenuItem';
import './PopUpCollection.css';

const PopUpCollection = ({collection, products, context, hidden, data, formSelection}) =>
  <ul className="pop-up-ul pop-up-collection-list">
    {products.index.map(i =>
      <li className="pop-up-collection-li" key={products[i].id}>
        {context === "menu" ?
          <PopUpCollectionMenuItem
            collection={collection}
            product={products[i]}
            checked={hidden[i] || data.candidates[collection].indexOf(i) !== -1}
            formSelection={formSelection} />
        :
          <p>{products[i].title}: {products[i].error.code} - {products[i].error.message}</p>
        }
      </li>
    )}
  </ul>


export default PopUpCollection;
