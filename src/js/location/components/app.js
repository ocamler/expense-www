import React, { Component } from 'react';

import LocationName from './location_name';
import Shortcuts from './shortcuts';
import Controls from './controls';
import HUD from './hud';

export default class extends Component {
  render() {
    return (
      <div>
        <Shortcuts />
        <LocationName />
        <Controls />
        <HUD />
      </div>
    )
  }
}

