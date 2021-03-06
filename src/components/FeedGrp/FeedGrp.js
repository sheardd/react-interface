import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Feed from '../Feed'
import './FeedGrp.css';

const FeedGrp = ({activeFeed, ...rest}) => {
  const openClasses = classNames(
    "order-feed",
    {"open": activeFeed === "open"}
  );
  const otherClasses = classNames(
    "order-feed",
    {"open": activeFeed === "other"}
  );
  return (
    <div id="order-feeds">
      <Feed id="open-feed" className={openClasses} feed="open" {...rest} />
      <Feed id="other-feed" className={otherClasses} feed="other" {...rest} />
    </div>
  );
}

export default FeedGrp;