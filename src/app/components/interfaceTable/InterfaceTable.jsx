import React, { PropTypes } from 'react';
import InterfaceTableRow from './InterfaceTableRow.jsx';

const InterfaceTable = ({ interfaces }) => {
  return (
    <table className="table table-bordered table-hover">
      <thead>
        <tr>
          <th style={{width: '40px', textAlign: 'center'}}>
            ID
          </th>
          <th>
            Name
          </th>
          <th style={{width: '140px', textAlign: 'center'}}>
            Type
          </th>
          <th >
            Description
          </th>
        </tr>
      </thead>
      <tbody>
        {
          interfaces.map(
            (interf, interfIdx) => (
              <InterfaceTableRow
                key={interfIdx}
                {...interf}
              />
            )
          )
        }
      </tbody>
    </table>
  );
};

InterfaceTable.propTypes = {
  interfaces: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
      type: PropTypes.string,
      description: PropTypes.string
    })
  )
};

export default InterfaceTable;
