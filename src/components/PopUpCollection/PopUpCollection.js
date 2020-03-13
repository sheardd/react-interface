import React from 'react';
import PropTypes from 'prop-types';
import PopUpCollectionMenuItem from '../PopUpCollectionMenuItem';
import './PopUpCollection.css';

const PopUpCollection = ({collection, products, context, hidden, pupData, pupSelection}) =>
  <ul className="pop-up-ul pop-up-collection-list">
    {products.index.map(i =>
      <li className="pop-up-collection-li" key={products[i].id}>
        {context === "menu" ?
          <PopUpCollectionMenuItem
            collection={collection}
            product={products[i]}
            checked={(hidden.index.indexOf(i) === -1 && pupData.hiding[collection].indexOf(i) === -1) || pupData.revealing[collection].indexOf(i) !== -1}
            pupSelection={pupSelection} />
        :
          <>
            {context === "error-product" ?
              <p>{products[i].title}: {products[i].error.code} - {products[i].error.message}</p>
              :
              <p>{products[i].code} - {products[i].message}</p>
            }
          </>
        }
      </li>
    )}
  </ul>


export default PopUpCollection;
