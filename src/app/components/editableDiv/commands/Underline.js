import React, {
  PureComponent,
  PropTypes
}                       from 'react';

class Underline extends PureComponent {
  state = {
    command: 'underline',
    arg: null
  };

  render() {
    return (
      <button
        type="button"
        className="btn btn-default"
        style={{width: '30px'}}
        onClick={this.handlesOnClick}>
        <i className="fa fa-underline"></i>
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

Underline.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default Underline;
