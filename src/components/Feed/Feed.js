import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import './Feed.css';

const Feed = (props) => {
  const {
    id,
    className,
    orders,
  } = props;
  return (
    <div id={id} className={className}></div>
  );
}

export default Feed;