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

    this.stateToSet = this.stateToSet.bind(this);
    this.formSelection = this.formSelection.bind(this);
    this.updateFormSelection = this.updateFormSelection.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  render() {
    const {popUp, togglePup, pupData} = this.props;
    return(
      <div id={popUp.id} className="pop-up bg-grey">
        <div id={popUp.id + "-inner"} className="pop-up-inner">
          <PopUpForm
            id={popUp.id}
            description={popUp.description}
            list={popUp.list}
            togglePup={togglePup}
            pupData={pupData}
            formSelection={this.formSelection} />
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

  formSelection(id, context) {
    this.setState(this.updateFormSelection(id,context));
  }

  updateFormSelection(update, context) {
    return (prevState) => {
      const {data} = prevState;
      if (context === "menu") {
        return {
          data: {
            candidates: 
              Object.keys(data.candidates).reduce((obj, key) => {
                if (key === update.collection) {
                  if (data.candidates[key].indexOf(update.id) !== -1) {
                    obj[key] = data.candidates[key].filter(i => i !== update.id);
                  } else {
                    obj[key] = [...data.candidates[key], update.id];
                  }
                } else {
                  obj[key] = data.candidates[key];
                }
                return obj;
              }, {})
          }
        }
      } else {
        return {
          data: {
            driver: update
          }
        }
      }
    }
  }

  componentDidMount() {
    const {popUp, fetchMenu} = this.props;
    if (popUp.id === "menu") {
      fetchMenu();
    }
  }
}

export default popUp;