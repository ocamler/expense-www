import React, { Component } from 'react';

import Location from './location_info';
import Details from './details';
import Controls from './controls';
import Datepicker from './datepicker';

export default class extends Component {
  render() {
    return (
      <div>
        <Location />

        <Details />

        <Controls />

        <Datepicker />
      </div>
    )
  }
}


