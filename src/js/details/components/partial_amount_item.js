import React from 'react';

export function PartialAmountItem(props) {
  const { clickHandler, id, amount, cat_desc, isTaxd } = props;
  return (
    <li>
      {'$'}<b>{amount}</b>{' '}&mdash;{' '}
      {cat_desc}
      {isTaxd ? " (tax-deductible)" : ""}
      {'  '.replace(/ /g, "\u00a0")}
      <i className="fa fa-sm no-fa fa-close close-x"
         aria-hidden="true"
         style={{cursor: 'pointer'}}
         onClick={e => {
           e.preventDefault();
           return clickHandler(id);
         }}></i>
    </li>
  );
}

// TODO: turn these into table <tr>s rather than <li>s so
//         that columns are aligned
