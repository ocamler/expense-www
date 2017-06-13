import $ from 'jquery';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import RecentEntries from './recent_entries';
import * as actions from '../actions';

@connect(
  state => ({
    args: state.args,
    recent_entries: state.recent_entries,
    show_count: state.show_count,
  }),
  actions
)
export default class extends Component {
  onStartAgain(e) {
    const { key } = this.props.args;
    window.location.href = './?' + $.param({key});
  }

  onShowMoreEntries(e) {
    return this.props.show_more_entries();
  }

  render() {
    const { exp_number } = this.props.args;
    return (
      <div>
        <h2 className="text-center">
          <small>{'Expense No.'}</small>
          {' '}
          {exp_number}
        </h2>

        <br />

        <p className="text-center">
          <button className="btn btn-lg btn-default"
                  type="button"
                  onClick={this.onStartAgain.bind(this)} >
            <i className="fa fa-reply-all fa-sm no-fa" aria-hidden="true"></i>
            {'  Start Again'.replace(/ /g, "\u00a0")}
          </button>
        </p>

        <RecentEntries />

        <p className="text-center">
          <button className="btn btn-lg btn-default"
                  type="button"
                  onClick={this.onShowMoreEntries.bind(this)} >
            <i className="fa fa-database fa-sm no-fa" aria-hidden="true"></i>
            {'  Show More'.replace(/ /g, "\u00a0")}
          </button>
        </p>
      </div>
    )
  }
}

