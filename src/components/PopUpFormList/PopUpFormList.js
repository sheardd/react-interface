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
        const item = id === "driver" ? i : list[i];
        return(
            <PopUpFormListItem key={i} context={id} item={item} i={i} hidden={list["hidden"]}></PopUpFormListItem>
        );
      }
    )}
    {id === "driver" ?
      <PopUpFormListItem key="unassign" context="unassign" item="unassign" i="unassign" hidden={false}></PopUpFormListItem>
    :
      null
    }
  </ul>

export default PopUpFormList;