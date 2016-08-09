import React from 'react';

function DeductibleIndicator(props) {
  return (
    <tr>
      <td className="labelCell">{'Deductible?:'}</td>
      <td className="valueCell">{'Yes'}</td>
    </tr>
  );
}

export function RecentEntryItem(props) {
  const { entryId,
          entryDate,
          entryDesc,
          entryAmount,
          entryMethodPayment,
          entryCategory,
          entryIsTaxd,
          index } = props;
  // greenbar for every other entry
  let classes = "completedTable" + ((index % 2) ? " odd-row" : "");
  return (
    <div>
      <table className={classes}
             border="0"
             cellspacing="0"
             cellpadding="0">
        <tr>
          <td className="labelCell">{'ID:'}</td>
          <td className="valueCell">{entryId}</td>
        </tr>
        <tr>
          <td className="labelCell">{'Date:'}</td>
          <td className="valueCell">{entryDate}</td>
        </tr>
        <tr>
          <td className="labelCell">{'Desc:'}</td>
          <td className="valueCell">{entryDesc}</td>
        </tr>
        <tr>
          <td className="labelCell">{'$'}</td>
          <td className="valueCell">{entryAmount}</td>
        </tr>
        <tr>
          <td className="labelCell">{'Payment Method:'}</td>
          <td className="valueCell">{entryMethodPayment}</td>
        </tr>
        <tr>
          <td className="labelCell">{'Category:'}</td>
          <td className="valueCell">{entryCategory}</td>
        </tr>
        {((entryIsTaxd)) ? <DeductibleIndicator /> : null}
      </table>
      <br />
    </div>
  );
}

