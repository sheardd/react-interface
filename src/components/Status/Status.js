import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import './Status.css';

const Status = ({togglePup, updateStatus}) => {
  const updateStyles = classNames(
  	"bg-grey",
  	{"updating": updateStatus},
  	{"bg-green": updateStatus === "done"},
  	{"bg-red": updateStatus === "error"},
  );
  return (
    <div id='status-container'>
      <span id='connect-status' className='bg-grey'><span className='fas fa-wifi'></span></span>
      <span id='print-status' className='bg-grey'><span className='fas fa-print'></span></span>
      <span id='update-status' className={updateStyles} onClick={() => togglePup("error")}>...</span>
    </div>
  );
 }

export default Status;