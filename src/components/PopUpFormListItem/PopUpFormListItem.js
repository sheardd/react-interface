import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import PopUpCollection from '../PopUpCollection';
import './PopUpFormListItem.css';

const PopUpFormListItem = ({context, item, i, hidden}) =>
  <li className="pop-up-li">
    <label><h3 className="pop-up-li-title">{i.toUpperCase()}</h3></label>
    {context === "menu" ?
      <PopUpCollection collection={item} hidden={hidden}/>
    :
      null
    }
  </li>


export default PopUpFormListItem;