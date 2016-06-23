import React, { Component } from 'react';

import Location from './location_info';
import MethodPayments from './method_payments';
import Categories from './categories';
import Amounts from './amounts';
import Controls from './controls';

export default class extends Component {
  render() {
    return (
      <div>
        <Location />

        <MethodPayments />

        <Amounts />

        <Categories />

        <Controls />
      </div>
    )
  }
}

