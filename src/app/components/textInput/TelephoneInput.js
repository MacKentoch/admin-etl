import React, {
  PureComponent,
  PropTypes
}                     from 'react';
import cx             from 'classnames';

const telephoneRegex = /^(\+33|0033|0)([0-9])[0-9]{8}$/g;


class TelephoneInput extends PureComponent {
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
    const {label, id, value} = this.props;
    const {valid} = this.state;
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
            onInput={this.handlesOnChange}
            // onChange={this.handlesOnChange} // react 15.x IE11 bug
          />
        </div>
      </div>
    );
  }

  checkIsValidTelephone = (value) => {
    // test telephone pattern:
    const isValid = telephoneRegex.test(value);
    this.setState({ valid: isValid });
  }

  handlesOnChange = (event) => {
    event.preventDefault();
    this.setState({stateValue: event.target.value});
    this.checkIsValidTelephone(event.target.value);
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

TelephoneInput.propTypes = {
  label:    PropTypes.string.isRequired,
  id:       PropTypes.string.isRequired,
  value:    PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  delay:    PropTypes.number
};

TelephoneInput.defaultProps = {
  delay: 200
};

export default TelephoneInput;
