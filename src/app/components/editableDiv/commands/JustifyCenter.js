import React, {
  PureComponent,
  PropTypes
}                       from 'react';

class JustifyCenter extends PureComponent {
  state = {
    command: 'justifyCenter',
    arg: null
  };

  render() {
    const { commandName } = this.props;
    return (
      <a
        href="#"
        onClick={this.handlesOnClick}>
        {commandName}
      </a>
    );
  }

  handlesOnClick = (event) => {
    event.preventDefault();

    const { command } = this.state;
    const { onClick } = this.props;

    onClick(command);
  }
}

JustifyCenter.propTypes = {
  onClick: PropTypes.func.isRequired,
  commandName:PropTypes.string.isRequired
};

export default JustifyCenter;
