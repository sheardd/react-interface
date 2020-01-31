import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import PopUpFormListItem from '../PopUpFormListItem';
import './PopUpFormList.css';

const PopUpFormList = ({id, list}) =>
  <ul id={id + "-list"}>
    {list.index.map(
      item => {
        const i = list[item];
        return(
          <PopUpFormListItem key={item} {...i}>{item}</PopUpFormListItem>
        );
      }
    )}
  </ul>

export default PopUpFormList;