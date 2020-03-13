import React from 'react';
import PropTypes from 'prop-types';
import PopUpFormList from '../PopUpFormList';
import Button from '../Button';
import './PopUpForm.css';

const PopUpForm = ({id, description, list, togglePup, submitCB, ...rest}) =>
<form id={id + "-form"} className="pop-up-form">
  {description && <p>{description}</p>}
  {list && list.index.length ?
    <PopUpFormList id={id} list={list} {...rest} />
  :
    <>
      {id !== "settle" &&
        <>
          {id === "driver" && list && !list.index.length ?
            <p className="pls-wait-msg">No drivers are logged in right now.</p>
          :
            <p className="pls-wait-msg">Fetching data, please wait...</p>
          }
        </>
      }
    </>
  }

  <div className="btn-row">
    <Button className="submit-button update" onClick={(e) => {e.stopPropagation(); submitCB()}}>{id === "error" ? "Clear Log" : "Update"}</Button>
    <Button className="submit-button cancel" onClick={(e) => {e.stopPropagation(); togglePup()}}>Cancel</Button>
  </div>
</form>

export default PopUpForm;