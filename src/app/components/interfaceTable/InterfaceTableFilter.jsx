import React, { PureComponent, PropTypes } from 'react';

const MILLI_SECS_BEFORE_CALLBACK_VALUE = 100;

class InterfaceTableFilter extends PureComponent {
  state = { currentValue: '' };

  componentWillReceiveProps(newProps) {
    const { currentValue } = this.state;
    const { value } = newProps;
    // set initial value from props
    if (currentValue !== value) {
      this.setState({ currentValue: value });
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  render() {
    const { currentValue, label } = this.props;
    return (
      <div className="form-group">
        <label className="control-label">
          {label}
        </label>
        <div className="input-group">
          <span className="input-group-addon">
            <i className="fa fa-filter" aria-hidden="true" />
          </span>
          <input
            className="form-control"
            type="text"
            defaultValue={currentValue}
            onInput={this.handlesOnChange}
          />
        </div>
      </div>
    );
  }

  handlesOnChange = (event) => {
    event.preventDefault();
    const newValue = event.target.value;

    this.setState({currentValue: newValue});

    if (this.timer) {
      clearTimeout(this.timer);
    }

    const { onChange } = this.props;
    this.timer = setTimeout(
      () => onChange(newValue),
      MILLI_SECS_BEFORE_CALLBACK_VALUE
    );
  }
}

InterfaceTableFilter.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

InterfaceTableFilter.defaultProps = {
  label: 'Filter:'
};

export default InterfaceTableFilter;
