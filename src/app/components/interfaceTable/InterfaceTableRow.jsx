import React, { PropTypes } from 'react';
import InterfaceType from '../interfaceType/InterfaceType.jsx';

const InterfaceTableRow = ({ id, name, type, description }) => {
  return (
    <tr style={{ cursor: 'pointer' }}>
      <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>
        {id}
      </td>
      <td style={{ verticalAlign: 'middle' }}>
        {name}
      </td>
      <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>
        <InterfaceType
          type={type}
        />
      </td>
      <td style={{ verticalAlign: 'middle' }}>
        {description}
      </td>
    </tr>
  );
};

InterfaceTableRow.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string,
  type: PropTypes.string,
  description: PropTypes.string
};

export default InterfaceTableRow;
