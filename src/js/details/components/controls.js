import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';

@connect(
  state => ({
    category: {
                cat_desc: state.categories.cat_desc,
                cat_number: state.categories.cat_number,
              },
    method_payment: state.method_payments.active,
    amounts: state.amounts
  }),
  actions
)
export default class extends Component {
  partiallyFilledIn() {
    // note: this is an XOR on these 2 fields
    return !this.props.category.cat_desc != !this.props.amounts.currentAmount;
  }

  bothFilledIn() {
    return this.props.category.cat_desc && this.props.amounts.currentAmount;
  }

  anotherItemDisabled() {
    return !this.bothFilledIn();
  }

  nextDisabled() {
    // The 'Next' button will be disabled if no method_payment is selected, OR
    //   the category and amount are only partially filled in, OR
    //   there are no payment items AND no category and amount filled in
    return !this.props.method_payment ||
           this.partiallyFilledIn() ||
           (!this.props.amounts.partialAmounts.length &&
            !this.bothFilledIn());
  }

  onAddAnother(e) {
    // make sure values (amount, category) are filled in before proceeding
    if (this.anotherItemDisabled()) {
      return;
    }
    this.props.amount_item_add(
      this.props.amounts.currentAmount,
      this.props.category.cat_desc,
      this.props.category.cat_number,
      this.props.amounts.isTaxd,
      true /* set multipleAmounts to true */
    );
  }

  onNext(e) {
    // make sure there are some values populated before proceeding
    if (this.nextDisabled()) {
      return;
    }
    // if the amount and category field are also filled in,
    //   apply before proceeding
    if (this.bothFilledIn()) {
      this.props.amount_item_add(
        this.props.amounts.currentAmount,
        this.props.category.cat_desc,
        this.props.category.cat_number,
        this.props.amounts.isTaxd,
        this.props.amounts.multipleAmounts
      );
    }
    // proceed to next screen
    this.props.go_to_next_screen();
  }

  render() {
    return (
      <div>
        <br />

        <p className="text-center">
          <button className="btn btn-lg btn-default"
                  type="button"
                  onClick={this.onAddAnother.bind(this)}
                  disabled={this.anotherItemDisabled()} >
            <i className="fa fa-undo fa-sm no-fa" aria-hidden="true"></i>
            {'  Another Amount'.replace(/ /g, "\u00a0")}
          </button>
          <button id="next"
                  className="btn btn-lg btn-default"
                  type="button"
                  onClick={this.onNext.bind(this)}
                  disabled={this.nextDisabled()} >
            {'Next  '.replace(/ /g, "\u00a0")}
            <i className="fa fa-caret-right fa-lg no-fa" aria-hidden="true"></i>
          </button>
        </p>
      </div>
    )
  }
}

