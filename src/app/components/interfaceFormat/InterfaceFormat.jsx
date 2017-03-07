import React, { PropTypes } from 'react';

const InterfaceFormat = ({ type }) => {
  const containsTable = /table/i;
  const containsCSV = /csv/i;
  const containsExcel = /excel/i;

  return (
    <div style={{ textAlign: 'center', paddingTop: '15px'}}>
      {
        containsTable.test(type) &&
        <i className="fa fa-2x fa-table" aria-hidden="true" />
      }
      {
        containsCSV.test(type) &&
        <i className="fa fa-2x fa-file-text-o" aria-hidden="true" />
      }
      {
        containsExcel.test(type) &&
        <i className="fa fa-2x fa-file-excel-o" aria-hidden="true" />
      }
      {
        !containsTable.test(type) &&
        !containsCSV.test(type) &&
        !containsExcel.test(type) &&
        <i className="fa fa-2x fa-file-o" aria-hidden="true" />
      }
      <p style={{ fontSize: '11px' }}>{ type ? type.toLowerCase() : '' }</p>
    </div>
  );
};

InterfaceFormat.propTypes = {
  type: PropTypes.string
};

export default InterfaceFormat;
