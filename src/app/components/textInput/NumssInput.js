import React, {
  PureComponent,
  PropTypes
}                     from 'react';
import cx             from 'classnames';

const numss15regex = /[1234][ \.\-]?[0-9]{2}[ \.\-]?(0[1-9]|[1][0-2])[ \.\-]?([0-9]{2}|2A|2B)[ \.\-]?[0-9]{3}[ \.\-]?[0-9]{3}[ \.\-]?[0-9]{2}/;


class NumssInput extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      valid: true,
      stateValue: ''
    };  
    this.timer = null;
  }

  componentWillReceiveProps(nextProps) {
    const { stateValue } = this.state;
    const { value } = nextProps;

    if ((value !== stateValue) && stateValue.length === 0) {
      this.setState({stateValue: value});
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  render() {
    const { label, id } = this.props;
    const { valid } = this.state;
    const { stateValue } = this.state;

    return (
      <div
        className={
          cx({
            'form-group': true,
            'has-error': !valid
          })
        }>
        <label
          className="control-label"
          htmlFor={id}>
          {label}
        </label>
        <div>
          <input
            className="form-control"
            id={id}
            type="text"
            // value={value}
            defaultValue={stateValue}
            // onChange={this.handlesOnChange}
            onInput={this.handlesOnChange}
          />
        </div>
      </div>
    );
  }

  handlesOnChange = (event) => {
    event.preventDefault();
    // test numss pattern:
    const isValid = numss15regex.test(event.target.value);
    this.setState({
      stateValue: event.target.value,
      valid: isValid
    });
    this.setTimerBeforeCallback(event.target.value);
  }

  setTimerBeforeCallback = (value) => {
    const { onChange, delay } = this.props;

    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    this.timer = setTimeout(
      () => onChange(value),
      delay
    );
  }
}

NumssInput.propTypes = {
  label:    PropTypes.string.isRequired,
  id:       PropTypes.string.isRequired,
  value:    PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  delay:    PropTypes.number
};

NumssInput.defaultProps = {
  delay: 200
};

export default NumssInput;
