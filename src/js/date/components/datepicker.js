import React, { Component } from 'react';
import { connect } from 'react-redux';
import DateTimeField from "react-bootstrap-datetimepicker";
import moment from 'moment';

import * as actions from '../actions';

@connect(
  state => ({
    date_info: state.date_info
  }),
  actions
)
export default class extends Component {
  onDateChanged(v) {
    this.props.date_changed(v);
  }

  render() {
    const { date, format } = this.props.date_info;
    return (
      <div>
        <span className="section-title">{'Date'}</span><br />
        <hr className="section-divider" />

        <div className="row">
          <div className="col-xs-11">
            <div className="dark-font">
              <DateTimeField mode="date"
                             dateTime={date}
                             inputFormat={format}
                             format={format}
                             onChange={this.onDateChanged.bind(this)} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
