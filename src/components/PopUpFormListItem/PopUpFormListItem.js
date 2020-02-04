import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import PopUpCollection from '../PopUpCollection';
import './PopUpFormListItem.css';

const PopUpFormListItem = ({context, item, i, hidden}) =>
  <li className="pop-up-li">
    {context === "menu" ?
      <PopUpCollection collection={item} title={i} hidden={hidden}/>
    :
      null
    }
    {context === "driver" ?
      <label><h3 className="pop-up-li-title">{item}</h3></label>
    :
      null
    }
    {context === "error" ?
      <label><h3 className="pop-up-li-title">{item}</h3></label>
    :
      null
    }
  </li>


export default PopUpFormListItem;