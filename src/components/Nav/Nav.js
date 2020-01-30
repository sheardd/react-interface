import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import Button from '../Button'
import './Nav.css';

const Nav = (props) => {
  const {
    type,
    wait_time,
    activeFeed,
    switchFeed,
    updateWaitTime,
    stop,
    restart,
  } = props;
  const openClasses = classNames(
    "bg-grey",
    {"bg-dark-grey": activeFeed === "open"}
  );
  const otherClasses = classNames(
    "bg-grey",
    {"bg-dark-grey": activeFeed === "other"}
  );
  return (
    <div id='int-nav'>
      {
        type === "ki" ?
        <nav>
          <Button id='int-nav-close' className='bg-grey' onClick={() => stop()}><span className='fas fa-times'></span></Button>
          <Button id='int-nav-refresh' className='bg-grey' onClick={() => restart()}><span className='fas fa-undo'></span></Button>
          <Button className={openClasses} id='int-nav-filter-open' onClick={() => switchFeed("open")} >OPEN</Button>
          <Button className={otherClasses} id='int-nav-filter-other' onClick={() => switchFeed("other")} >DONE</Button>
          <Button id='int-nav-menu' className='bg-grey'>MENU</Button>
          <span id='int-nav-wait' className='bg-grey wait-array'>
            <Button className='wait' value='0' onClick={() => updateWaitTime(0)}>+0</Button>
            <Button className='wait' value='20' onClick={() => updateWaitTime(20)}>+20</Button>
            <Button className='wait' value='30' onClick={() => updateWaitTime(30)}>+30</Button>
            <Button className='wait' value='40' onClick={() => updateWaitTime(40)}>+40</Button>
            <Button className='wait' value='60' onClick={() => updateWaitTime(60)}>+60</Button>
            <span className='wait-time'>
              <span className='inline-title'>Current Wait Time: </span>
              <span className='current-wait-time'>+{wait_time}</span>
            </span>
          </span>
          </nav>
        :
        <nav>
          <Button id="int-nav-close" className="bg-grey" onClick={() => stop()}><span className="fas fa-times"></span></Button>
          <Button className={openClasses} id="int-nav-filter-open" onClick={() => switchFeed("open")} >OPEN</Button>
          <Button className={otherClasses} id="int-nav-filter-other" onClick={() => switchFeed("other")} >PAID</Button>
          <Button className="bg-grey" id="int-nav-settle"><span className="fas fa-cash-register"></span></Button>
        </nav>
      }
    </div>
  );
}

export default Nav;