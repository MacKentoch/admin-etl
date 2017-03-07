import React, {
  PureComponent,
  PropTypes
}                       from 'react';

class StrikeThrough extends PureComponent {
  state = {
    command: 'strikeThrough',
    arg: null
  };

  render() {
    return (
      <button
        type="button"
        className="btn btn-default"
        style={{width: '30px'}}
        onClick={this.handlesOnClick}>
        <i className="fa fa-strikethrough"></i>
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

StrikeThrough.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default StrikeThrough;
