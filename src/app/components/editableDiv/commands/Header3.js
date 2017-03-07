import React, {
  PureComponent,
  PropTypes
}                       from 'react';

class Header3 extends PureComponent {
  state = {
    command: 'formatBlock',
    arg: 'H3'
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

Header3.propTypes = {
  onClick: PropTypes.func.isRequired,
  commandName:PropTypes.string.isRequired
};

export default Header3;
