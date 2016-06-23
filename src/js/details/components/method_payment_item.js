import React from 'react';

export function MethodPaymentItem(props) {
  const { clickHandler, isActive, label } = props;
  let classes = "btn btn-success btn-sm" + (isActive ? " active" : "");
  return (
    <a href="#"
       className={classes}
       aria-pressed="true"
       role="button"
       onClick={e => {
         e.preventDefault();
         return clickHandler(label);
       }}>
      {label}
    </a>
  );
}

