import React from 'react';

export function CategoryItem(props) {
  const { clickHandler, isActive, isTaxd, cat_desc, cat_number } = props;
  let classes = "btn btn-warning btn-sm" + (isActive ? " active" : "");
  return (
    <a href="#"
       className={classes}
       aria-pressed="true"
       role="button"
       data-istaxd={isTaxd}
       onClick={e => {
         e.preventDefault();
         return clickHandler(cat_desc, cat_number);
       }}>
      {cat_desc}
    </a>
  );
}

