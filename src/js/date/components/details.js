import React, { Component } from 'react';
import { connect } from 'react-redux';

import { AmountItem } from './amount_item';

@connect(
  state => ({
    details: state.details
  })
)
export default class extends Component {
  render() {
    const { method_payment, amounts } = this.props.details;
    const total = amounts.reduce((prevVal, i) => {
                    return prevVal + parseFloat(i.amount);
                  }, 0.00);
    return (
      <div>
        <h4 className="text-center close-bottom">
          <small>{'Payment Method:'}</small>
          {' '}
          {method_payment}
        </h4>

        <h4 className="text-center close-bottom">
          <small>{'Items:'}</small>
        </h4>

        <ul className="expenseItemReview">
        {amounts.map(i => (
           <AmountItem key={i.id}
                       id={i.id}
                       amount={i.amount}
                       cat_desc={i.cat_desc}
                       isTaxd={i.isTaxd} />
        ))}
        </ul>

        {amounts.length > 1 ? (
          <p className="text-center">
            <i>{'Total: $'}<b>{total}</b></i>
          </p>
         ) : ''}
      </div>
    )
  }
}

// TODO: put all this info in a <table>
