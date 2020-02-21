import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import classNames from 'classnames';
import PopUpForm from '../PopUpForm';
import './PopUp.css';

/* We're currently lifting all state from here up to KitchenInterface,
which may require us to lift related methods as well */

class popUp extends Component {
  constructor(props) {
    super(props);
    const {popUp} = this.props;
    
    this.stateToSet = this.stateToSet.bind(this);
    const stateToSet = this.stateToSet(popUp.id);

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  render() {
    const {popUp, togglePup, pupData, pupSelection, submitCB} = this.props;
    return(
      <div id={popUp.id} className="pop-up bg-grey">
        <div id={popUp.id + "-inner"} className="pop-up-inner">
          <PopUpForm
            id={popUp.id}
            description={popUp.description}
            list={popUp.list}
            togglePup={togglePup}
            pupData={pupData}
            pupSelection={pupSelection}
            submitCB={submitCB} />
        </div>
      </div>
    );
  }

  stateToSet(context) {
    const {list} = this.props.popUp;
    if (list) {
      if (context === "menu") {
        return {
          "candidates": Object.keys(list).reduce((obj,key) => {
            if (key !== "hidden") {
              obj[key] = [];
            }
            return obj;
          }, {}),
        };
      } else if (context === "driver") {
        return {"driver": ""};
      }
    }
    return false;
  }

  componentDidMount() {
    const {popUp, checkMenuState, driverFetchRequest} = this.props;
    if (popUp.id === "menu") {
      checkMenuState();
    } else if (popUp.id === "driver") {
      driverFetchRequest(popUp.orderId);
    }
  }
}

export default popUp;