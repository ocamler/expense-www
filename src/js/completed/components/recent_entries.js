import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';
import { RecentEntryItem } from './recent_entry_item';

@connect(
  state => ({
    recent_entries: state.recent_entries
  }),
  actions
)
export default class extends Component {
  render() {
    const { recent_entries } = this.props.recent_entries;
    return (
      <div>
        <span className="section-title">{'Recent Entries (Last 5)'}</span><br />
        <hr className="section-divider" />

        {recent_entries.map((i, idx) => (
          <RecentEntryItem key={i.exp_number}
                           entryId={i.exp_number}
                           entryDate={i.exp_date}
                           entryDesc={i.exp_desc}
                           entryAmount={i.exp_amount}
                           entryMethodPayment={i.method_payment}
                           entryCategory={i.category}
                           entryIsTaxd={i.istaxd}
                           index={idx} />
        ))}
      </div>
    )
  }
}

