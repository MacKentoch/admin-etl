import React, {
  PureComponent,
  PropTypes
}                       from 'react';

class FontSize6 extends PureComponent {
  state = {
    command: 'fontSize',
    arg: 6
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

FontSize6.propTypes = {
  onClick: PropTypes.func.isRequired,
  commandName:PropTypes.string.isRequired
};

export default FontSize6;
