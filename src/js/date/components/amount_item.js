import React from 'react';

export function AmountItem(props) {
  const { id, amount, cat_desc, isTaxd } = props;
  return (
    <li>
      {'$'}<b>{amount}</b>{' '}&mdash;{' '}
      {cat_desc}
      {isTaxd ? " (tax-deductible)" : ""}
      {'  '.replace(/ /g, "\u00a0")}
    </li>
  );
}

// TODO: turn these into table <tr>s rather than <li>s so
//         that columns are aligned
