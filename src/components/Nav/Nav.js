import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import './Nav.css';

/**
 * Break this down into composite button components and a separate wait time container to be
 * rendered conditionally if props.type === "ki"
 */

const Nav = (props) => {
  return (
    <div id='int-nav'>
      {
        props.type === "ki" ?
        <nav>
          <span id='int-nav-close' className='bg-grey'><span className='fas fa-times'></span></span>
          <span id='int-nav-refresh' className='bg-grey'><span className='fas fa-undo'></span></span>
          <span className='bg-grey bg-dark-grey' id='int-nav-filter-open'>OPEN</span>
          <span className='bg-grey' id='int-nav-filter-other'>DONE</span>
          <span id='int-nav-menu' className='bg-grey'>MENU</span>
          <span id='int-nav-wait' className='bg-grey wait-array'>
            <button className='wait' value='0'>+0</button>
            <button className='wait' value='20'>+20</button>
            <button className='wait' value='30'>+30</button>
            <button className='wait' value='40'>+40</button>
            <button className='wait' value='60'>+60</button>
            <span className='wait-time'>
              <span className='inline-title'>Current Wait Time: </span>
              <span className='current-wait-time'>+0</span>
            </span>
          </span>
          </nav>
        :
        <nav>
          <span id="int-nav-close" className="bg-grey"><span className="fas fa-times"></span></span>
          <span className="bg-grey bg-dark-grey" id="int-nav-filter-open">OPEN</span>
          <span className="bg-grey" id="int-nav-filter-other">PAID</span>
          <span className="bg-grey" id="int-nav-settle"><span className="fas fa-cash-register"></span></span>
        </nav>
      }
    </div>
  );
}

export default Nav;