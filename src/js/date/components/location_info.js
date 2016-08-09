import React, { Component } from 'react';
import { connect } from 'react-redux';

function NoGPSIndicator(props) {
  return (
    <h4 className="text-center close-bottom">
      <small>{'(No GPS)'}</small>
    </h4>
  );
}

@connect(
  state => ({
    location_info: state.location_info
  })
)
export default class extends Component {
  render() {
    const { lat, lng, location } = this.props.location_info;
    return (
      <div>
        <h4 className="text-center close-bottom">
          <small>{'Date/Submit:'}</small>
          {' '}
          <em>{location}</em>
        </h4>

        {(!(lat && lng)) ? <NoGPSIndicator /> : null}
      </div>
    )
  }
}

