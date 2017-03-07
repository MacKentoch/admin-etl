import React, {
  PureComponent,
  PropTypes
}                       from 'react';

class FontSize4 extends PureComponent {
  state = {
    command: 'fontSize',
    arg: 4
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

    const { command, arg } = this.state;
    const { onClick } = this.props;

    onClick(command, arg);
  }
}

FontSize4.propTypes = {
  onClick: PropTypes.func.isRequired,
  commandName:PropTypes.string.isRequired
};

export default FontSize4;
