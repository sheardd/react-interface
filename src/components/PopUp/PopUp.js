import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PopUpForm from '../PopUpForm';
import './PopUp.css';

class popUp extends Component {
  constructor(props) {
    super(props);
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

  componentDidMount() {
    const {
      popUp,
      checkMenuState,
      driverFetchRequest,
    } = this.props;
    if (popUp.id === "menu") {
      checkMenuState();
    } else if (popUp.id === "driver") {
      driverFetchRequest(popUp.current, popUp.context);
    }
  }
}

export default popUp;