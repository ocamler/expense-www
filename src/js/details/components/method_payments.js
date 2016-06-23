import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';
import { MethodPaymentItem } from './method_payment_item';

@connect(
  state => ({
    method_payments: state.method_payments
  }),
  actions
)
export default class extends Component {
  render() {
    const { method_payment_selected } = this.props;
    const { methods, active } = this.props.method_payments;
    return (
      <div>
        <span className="section-title">{'Payment Method'}</span><br />
        <hr className="section-divider" />

        <p className="close-bottom text-center">
          {methods.map(i => (
            <MethodPaymentItem key={i.sort_order}
                               isActive={active == i.name}
                               label={i.name}
                               clickHandler={method_payment_selected} />
          ))}
        </p>
      </div>
    )
  }
}

