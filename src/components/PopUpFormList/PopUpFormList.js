import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import PopUpFormListItem from '../PopUpFormListItem';
import './PopUpFormList.css';

const PopUpFormList = ({id, list}) =>
  <ul id={id + "-list"} className="pop-up-ul">
    {list.index.filter(i => i !== "hidden").map(
      i => {
        const item = list[i];
        return(
            <PopUpFormListItem key={i} context={id} item={item} i={i} hidden={list["hidden"]}></PopUpFormListItem>
        );
      }
    )}
  </ul>

export default PopUpFormList;