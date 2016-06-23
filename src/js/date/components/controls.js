import $ from 'jquery';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

@connect(
  null,
  actions
)
export default class extends Component {
  onSubmit(e) {
    $(this).prop("disabled", true);
    this.props.submit_form();
  }

  render() {
    return (
      <div>
        <br />

        <p className="text-center">
          <button className="btn btn-lg btn-default"
                  type="button"
                  onClick={this.onSubmit.bind(this)} >
            <i className="fa fa-rocket fa-sm no-fa" aria-hidden="true"></i>
            {'  Submit'.replace(/ /g, "\u00a0")}
          </button>
        </p>
      </div>
    )
  }
}
