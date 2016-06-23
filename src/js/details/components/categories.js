import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';
import { CategoryItem } from './category_item';

@connect(
  state => ({
    categories: state.categories
  }),
  actions
)
export default class extends Component {
  render() {
    const { category_selected } = this.props;
    const { cats, cat_desc } = this.props.categories;
    return (
      <div>
        <span className="section-title">{'Categories'}</span><br />
        <hr className="section-divider" />

        <p className="close-bottom text-center">
          {cats.map(i => (
            <CategoryItem key={i.cat_number}
                          isActive={cat_desc == i.cat_desc}
                          isTaxd={i.tax_deduct}
                          cat_desc={i.cat_desc}
                          cat_number={i.cat_number}
                          clickHandler={category_selected} />
          ))}
        </p>
      </div>
    )
  }
}

