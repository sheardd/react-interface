import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import Button from '../Button'
import './Nav.css';

const Nav = (props) => {
  return (
    <div id='int-nav'>
      {
        props.type === "ki" ?
        <nav>
          <Button id='int-nav-close' className='bg-grey'><span className='fas fa-times'></span></Button>
          <Button id='int-nav-refresh' className='bg-grey'><span className='fas fa-undo'></span></Button>
          <Button className='bg-grey bg-dark-grey' id='int-nav-filter-open'>OPEN</Button>
          <Button className='bg-grey' id='int-nav-filter-other'>DONE</Button>
          <Button id='int-nav-menu' className='bg-grey'>MENU</Button>
          <span id='int-nav-wait' className='bg-grey wait-array'>
            <Button className='wait' value='0'>+0</Button>
            <Button className='wait' value='20'>+20</Button>
            <Button className='wait' value='30'>+30</Button>
            <Button className='wait' value='40'>+40</Button>
            <Button className='wait' value='60'>+60</Button>
            <span className='wait-time'>
              <span className='inline-title'>Current Wait Time: </span>
              <span className='current-wait-time'>+0</span>
            </span>
          </span>
          </nav>
        :
        <nav>
          <Button id="int-nav-close" className="bg-grey"><span className="fas fa-times"></span></Button>
          <Button className="bg-grey bg-dark-grey" id="int-nav-filter-open">OPEN</Button>
          <Button className="bg-grey" id="int-nav-filter-other">PAID</Button>
          <Button className="bg-grey" id="int-nav-settle"><span className="fas fa-cash-register"></span></Button>
        </nav>
      }
    </div>
  );
}

export default Nav;