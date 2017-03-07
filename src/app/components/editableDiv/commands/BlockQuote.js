import React, {
  PureComponent,
  PropTypes
}                       from 'react';

class BlockQuote extends PureComponent {
  state = {
    command: 'formatBlock',
    arg: 'BLOCKQUOTE'
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

  handlesOnClick = event => {
    event.preventDefault();

    const { command, arg } = this.state;
    const { onClick } = this.props;

    onClick(command, arg);
  }
}

BlockQuote.propTypes = {
  onClick: PropTypes.func.isRequired,
  commandName:PropTypes.string.isRequired
};

export default BlockQuote;
