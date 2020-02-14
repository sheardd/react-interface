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

    this.stateToSet = this.stateToSet.bind(this);
    this.formSelection = this.formSelection.bind(this);
    this.updateFormSelection = this.updateFormSelection.bind(this);
  }
  render() {
    const {popUp, togglePup} = this.props;
    const {data} = this.state;
    return(
      <div id={popUp.id} className="pop-up bg-grey">
        <div id={popUp.id + "-inner"} className="pop-up-inner">
          <PopUpForm
            id={popUp.id}
            description={popUp.description}
            list={popUp.list}
            togglePup={togglePup}
            data={data}
            formSelection={this.formSelection} />
        </div>
      </div>
    );
  }

  stateToSet(context) {
    const {list} = this.props.popUp
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
    } else {
      return false;
    }
  }

  formSelection(id, context) {
    this.setState(this.updateFormSelection(id,context));
  }

  updateFormSelection(update, context) {
    const {list} = this.props.popUp;
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
}

export default popUp;