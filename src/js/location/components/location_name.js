import $ from 'jquery';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

@connect(
  state => ({
    location_name: state.location_name
  }),
  actions
)
export default class extends Component {
  onClick(e) {
    $("#location_input").focus();
    return this.props.input_reset();
  }

  onChange(e) {
    return this.props.input_changed(e.target.value);
  }

  render() {
    return (
      <div className="form-group has-feedback has-clear">
        <input id="location_input"
               className="dark-text form-control" 
               type="text" 
               placeholder="Enter Location Here" 
               value={this.props.location_name}
               onChange={this.onChange.bind(this)} />
        <span id="clear"
              className="fa fa-close form-control-feedback form-control-clear"
              style={{visibility: this.props.location_name ? 'visible' : 'hidden'}}
              onClick={this.onClick.bind(this)}></span>
      </div>
    )
  }
}

/* note: onClick={this.props.input_reset} works as well, but doesn't allow for extra JS commands */
