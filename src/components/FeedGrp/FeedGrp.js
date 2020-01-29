import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import Feed from '../Feed'
import './FeedGrp.css';

const FeedGrp = (props) => 
  <div id="order-feeds">
    <Feed id="open-feed" className="order-feed open" feed="open" {...props} />
    <Feed id="other-feed" className="order-feed" feed="other" {...props} />
  </div>

export default FeedGrp;