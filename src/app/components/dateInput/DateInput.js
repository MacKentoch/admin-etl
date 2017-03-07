import React, {
  PropTypes
}                 from 'react';
import DatePicker from 'react-datepicker';
// import moment from 'moment';

const DateInput = ({label, id, value, onChange}) => {
  // console.log('date value: ', value);
  // console.log('date value converted: ', moment(value, 'dd/MM/YYYY'));

  return (
    <div className="form-group">
      <label
        className="control-label"
        htmlFor={id}>
        {label}
      </label>
      <div>
        <DatePicker
          dateFormat="DD/MM/YYYY"
          selected={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

DateInput.propTypes = {
  label:    PropTypes.string.isRequired,
  id:       PropTypes.string.isRequired,
  value:    PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default DateInput;
