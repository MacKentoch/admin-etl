import React, { PropTypes } from 'react';
import Row from './row/Row.jsx';
import cx from 'classnames';

const Table  = ({
  headers,
  rows,
  noDataContent,
  onRowClick,
  tableHoverStyle,
  tableBorderStyle
}) => {
  const totalRows = rows.length;

  return (
    <div>
      {
        totalRows > 0 &&
        <table
          className={
            cx({
              table: true,
              'table-bordered': tableBorderStyle,
              'table-hover': tableHoverStyle
            })
          }>
          <thead>
            <tr>
              {
                headers.map(
                  ({value, width}, headerIdx) => (
                      typeof width === 'number' ?
                      <th
                        key={headerIdx}
                        style={{width: `${width}px`}}>
                        {value}
                      </th>
                      :
                      <th
                        key={headerIdx}>
                        {value}
                      </th>
                  )
                )
              }
            </tr>
          </thead>
          <tbody>
            {
              rows.map(
                (row, rowIdx) => {
                  return row && row.columns && row.columns.length > 0
                  ?
                  (
                    <Row
                      key={rowIdx}
                      onRowClick={onRowClick}
                      row={row}
                    />
                  )
                  :
                  (
                    null
                  );
                }
              )
            }
          </tbody>
        </table>
      }
      {
        totalRows === 0 &&
        noDataContent
      }
    </div>
  );
};

Table.propTypes = {
  tableBorderStyle: PropTypes.bool,
  tableHoverStyle: PropTypes.bool,

  onRowClick: PropTypes.func.isRequired,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      columns: PropTypes.arrayOf(
        PropTypes.shape({
          width: PropTypes.number,
          value: PropTypes.any.isRequired
        }).isRequired
      )
    })
  ),
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      width: PropTypes.number,
      value: PropTypes.any.isRequired
    }).isRequired
  ),
  noDataContent: PropTypes.node.isRequired
};

export default Table;
