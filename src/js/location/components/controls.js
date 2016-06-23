import $ from 'jquery';
import React, { Component } from 'react';
import { connect } from 'react-redux';

@connect(
  state => ({
    location_name: state.location_name
  })
)
export default class extends Component {
  render() {
    const { location_name } = this.props;
    const disabled = !$.trim(location_name);

    return (
      <p className="text-center">
        <input id="noGPS" type="checkbox" />
          {' '}
          <label htmlFor="noGPS">{'Don\'t track GPS for this entry'}</label><br />

        <button id="geotag"
                className="btn btn-lg btn-default"
                type="button"
                disabled={disabled} >
          <i className="fa fa-floppy-o fa-lg no-fa" aria-hidden="true"></i>
          {'  Store for later'.replace(/ /g, "\u00a0")}
        </button>
        <button id="next"
                className="btn btn-lg btn-default"
                type="button"
                disabled={disabled} >
          {'Next  '.replace(/ /g, "\u00a0")}
          <i className="fa fa-caret-right fa-lg no-fa" aria-hidden="true"></i>
        </button>
      </p>
    )
  }
}

