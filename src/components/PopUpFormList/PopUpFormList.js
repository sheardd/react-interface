import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import PopUpFormListItem from '../PopUpFormListItem';
import './PopUpFormList.css';

const PopUpFormList = ({id, list, ...rest}) =>
  <ul id={id + "-list"} className="pop-up-ul">
    {list.index.filter(i => i !== "hidden").map(
      i => {
        const item = id === "driver" ? i : list[i];
        return(
          <PopUpFormListItem
            key={i}
            context={id}
            item={item}
            i={i}
            hidden={list["hidden"]}
            {...rest} />
        );
      }
    )}
    {id === "driver" ?
      <PopUpFormListItem key="unassign" context="driver" item="unassign" i="unassign" hidden={false} {...rest} />
    :
      null
    }
  </ul>

export default PopUpFormList;