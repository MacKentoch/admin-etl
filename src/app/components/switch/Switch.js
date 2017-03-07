import React, { PropTypes, PureComponent } from 'react';

export default class Switch extends PureComponent {
  static propTypes = {
    on:         PropTypes.bool,
    onClick:    PropTypes.func,
    enabled:    PropTypes.bool,
    className:  PropTypes.string,
    setFocus:   PropTypes.bool
  };

  static defaultProps = {
    on: false,
    onClick: () => {},
    enabled: true,
    className: '',
    setFocus:   true
  };

  state = { on: false };

  componentDidMount() {
    const { on, setFocus } = this.props;
    this.setOn(on);
    if (setFocus === true) {
      //
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({on: nextProps.on});
  }

  render() {
    const { children, setFocus, className, enabled } = this.props;
    const { on } = this.state;
    const classNameComplete = ['switch', className, (on ? 'on ' : ''), (enabled ? '' : 'disabled ')].join(' ');

    return (
      <div
        className={classNameComplete}
        // tabIndex={setFocus === true ? 0 : -1}
        onClick={this.handleClick}>
        <div
          className="switch-toggle"
          children={children}
        />
      </div>
    );
  }

  setOn = on => (this.setState({ on }))

  handleClick = (e) => {
    e.preventDefault();
    if(this.props.enabled) {
      const { on } = this.state;
      this.props.onClick(!on);
      this.setState({on: !on});
    }
  }
}
