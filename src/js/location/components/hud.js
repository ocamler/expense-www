import React, { Component } from 'react';
import { connect } from 'react-redux';

@connect(
  state => ({
    hud: state.hud
  })
)
export default class extends Component {
  render() {
    if (this.props.hud.isError) {
      return (
        <p className="well text-danger">
          {this.props.hud.errorMessage}
        </p>
      )
    }
    return (
      <p className="well text-muted">
        {'Lat: '}{this.props.hud.lat}<br />
        {'Long: '}{this.props.hud.lng}<br />
        {'Alt: '}{this.props.hud.alt}<br />
        {'Acc: '}{this.props.hud.acc}
      </p>
    )
  }
}

