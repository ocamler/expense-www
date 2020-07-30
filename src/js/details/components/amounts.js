import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';
import { PartialAmountItem } from './partial_amount_item';

@connect(
  state => ({
    amounts: state.amounts
  }),
  actions
)
export default class extends Component {
  onClick(e) {
    const { isTaxd } = this.props.amounts;
    return this.props.taxd_selected(!isTaxd);
  }

  onChange(e) {
    return this.props.amount_changed(e.target.value);
  }

  showPartialAmounts() {
    // don't show if we don't have multipleAmounts yet
    if (!this.props.amounts.multipleAmounts) { return; }

    return (
        <ul className="expenseItem">
        {this.props.amounts.partialAmounts.map(i => (
           <PartialAmountItem key={i.id}
                              id={i.id}
                              amount={i.amount}
                              cat_desc={i.cat_desc}
                              isTaxd={i.isTaxd}
                              clickHandler={this.props.amount_item_remove} />
        ))}
        </ul>
    )
  }

  render() {
    const { currentAmount, isTaxd } = this.props.amounts;
    let bClasses = "btn btn-sm btn-default" +
                   (isTaxd ? " active" : "");
    let iClasses = "fa fa-sm no-fa " +
                   (isTaxd ? "fa-check-square-o" : "fa-square-o");
    return (
      <div>
        <span className="section-title">{'Amount(s)'}</span><br />
        <hr className="section-divider" />

        {this.showPartialAmounts()}

        <div className="row">
          <div className="col-xs-7">
            <input id="amount"
                   className="dark-text form-control"
                   type="number"
                   min="0"
                   inputmode="decimal"
                   pattern="[0-9.]*"
                   placeholder="0.00"
                   value={currentAmount}
                   onChange={this.onChange.bind(this)} />
          </div>

          <div className="col-xs-5">
            <button id="taxd"
                    className={bClasses}
                    type="button"
                    onClick={this.onClick.bind(this)} >
              <i className={iClasses} aria-hidden="true"></i>
              {'  Tax Deductible?'.replace(/ /g, "\u00a0")}
            </button>
          </div>
        </div>
      </div>
    )
  }
}

