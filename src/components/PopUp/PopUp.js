import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import PopUpForm from '../PopUpForm';
import './PopUp.css';

class popUp extends Component {
  constructor(props) {
    super(props);
    const {popUp} = this.props;
    this.stateToSet = this.stateToSet.bind(this);
    const stateToSet = this.stateToSet(popUp.id);
    if (stateToSet) {
      this.state = {
      	data: stateToSet,
      };
    }
  }
  render() {
  	const {popUp, togglePup} = this.props;
  	return(
      <div id={popUp.id} className="pop-up bg-grey">
        <div id={popUp.id + "-inner"} className="pop-up-inner">
          <PopUpForm id={popUp.id} description={popUp.description} list={popUp.list} togglePup={togglePup}/>
        </div>
      </div>
    );
  }

  stateToSet(context) {
    if (context === "menu") {
      return {
        "candidates": {
          index: [],
        }
      };
    } else if (context === "driver") {
      return {"driver": ""};
    } else {
      return false;
    }
  }
}

export default popUp;