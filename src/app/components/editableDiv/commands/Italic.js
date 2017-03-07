import React, {
  PureComponent,
  PropTypes
}                       from 'react';

class Italic extends PureComponent {
  state = {
    command: 'italic',
    arg: null
  };
  render() {
    return (
      <button
        type="button"
        className="btn btn-default"
        style={{width: '30px'}}
        onClick={this.handlesOnClick}>
        <i className="fa fa-italic"></i>
      </button>
    );
  }

  handlesOnClick = (event) => {
    event.preventDefault();

    const { command } = this.state;
    const { onClick } = this.props;

    onClick(command);
  }
}

Italic.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default Italic;
