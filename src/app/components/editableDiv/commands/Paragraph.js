import React, {
  PureComponent,
  PropTypes
}                       from 'react';

class Paragraph extends PureComponent {
  state = {
    command: 'formatBlock',
    arg: 'P'
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

Paragraph.propTypes = {
  onClick: PropTypes.func.isRequired,
  commandName:PropTypes.string.isRequired
};

export default Paragraph;
