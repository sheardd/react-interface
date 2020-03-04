import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import PopUpCollection from '../PopUpCollection';
import './PopUpFormListItem.css';

const PopUpFormListItem = ({context, item, i, pupSelection, ...rest}) => {
  const title = context !== "error" ? i.toUpperCase() : (item.index && item[item.index[0]].title ? "Menu Update Error" : "Connection Error");
  return(
    <li className="pop-up-li" key={i}>
      {context === "driver" ?
        <input type="radio" id={"assign-" + title}
          value={title} name="driver-assign-radio"
          onChange={() => pupSelection(i, "driver")}/>
      :
        null
      }
      <label htmlFor={context === "driver" ? "assign-" + title : null} ><h3 className="pop-up-li-title">{title}</h3></label>
      {context === "menu" ?
        <PopUpCollection collection={i} products={item} context={context} pupSelection={pupSelection} {...rest}/>
      :
        null
      }
      {context === "error" ?
        <>
          {item.index ?
            <>
              {item[item.index[0]].title ?
                <>
                  <p>Encountered errors updating the following products.</p>
                  <PopUpCollection products={item} context={context + "-product"}/>
                </>
              :
                <>
                  <p>There was a problem with the connection.</p>
                  <PopUpCollection products={item} context={context}/>
                </>
              }
              <p>Please ensure you are connected to the internet and that your Shopify credentials are valid. If the problem persists, please contact the developer as soon as possible. If you have recently made product updates on Shopify, please try reloading this page and updating again. You can also look up products on Shopify (Shopify > Products) and manually update them by checking the box beside the product, then selecting Actions > Make Products Available/Unavailable.</p>
            </>
          :
            <p>{item.message}</p>
          }
        </>
      :
        null
      }
    </li>
  );
}

export default PopUpFormListItem;