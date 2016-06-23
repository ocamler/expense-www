import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';
import { ShortcutItem } from './shortcut_item';

@connect(
  state => ({
    shortcut_items: state.shortcut_items
  }),
  actions
)
export default class extends Component {
  render() {
    const { input_selected, shortcut_items } = this.props;
    return (
      <p className="text-center">
        {shortcut_items.map(i => (
          <ShortcutItem key={i.id}
                        letter={i.letter}
                        label={i.label}
                        clickHandler={input_selected} />
        ))}
      </p>
    )
  }
}

