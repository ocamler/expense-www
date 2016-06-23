import React from 'react';

export function ShortcutItem(props) {
  const { clickHandler, letter, label } = props;
  return (
    <a href="#"
       className="btn btn-primary btn-sm"
       role="button"
       onClick={e => {
         e.preventDefault();
         return clickHandler(label);
       }}>
      <span className="badge">{letter}</span> {label}
    </a>
  );
}

