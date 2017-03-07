import React, {
  PureComponent,
  PropTypes
}                     from 'react';

class TextInput extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { stateValue: '' };
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
    const {label, id} = this.props;
    const { stateValue } = this.state;

    return (
      <div className="form-group">
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
          />
        </div>
      </div>
    );
  }

  handlesOnChange= (event) => {
    event.preventDefault();
    this.setState({stateValue: event.target.value});
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

TextInput.propTypes = {
  label:    PropTypes.string.isRequired,
  id:       PropTypes.string.isRequired,
  value:    PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  delay:    PropTypes.number
};

TextInput.defaultProps = {
  delay: 200
};

export default TextInput;
