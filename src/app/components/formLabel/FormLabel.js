import React, { PropTypes } from 'react';

const FormLabel = ({id, label, value}) => {
  return (
    <div className="form-group">
      <label
        className="control-label"
        htmlFor={'formLabel' + id}>
        {label}
      </label>
      <div style={{
        borderBottomWidth: '1px',
        borderBottomColor: '#F1F1F1',
        borderBottomStyle: 'solid'
      }}>
        <label className="formLabelValue">
          {value
            ? value
            : <span style={{color: '#FFF'}}>vide</span>
          }
        </label>
      </div>
    </div>
  );
};

FormLabel.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default FormLabel;
