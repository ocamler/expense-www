import React, { Component } from 'react';
import { connect } from 'react-redux';

@connect(
  state => ({
    location_info: state.location_info
  })
)
export default class extends Component {
  render() {
    return (
      <div>
        <h4 className="text-center close-bottom">
          <small>Details:</small>
          {' '}
          <em>{this.props.location_info.location}</em>
        </h4>
      </div>
    )
  }
}

