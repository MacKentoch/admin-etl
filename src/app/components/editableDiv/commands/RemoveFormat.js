import React, {
  PureComponent,
  PropTypes
}                       from 'react';

class RemoveFormat extends PureComponent {
  state = {
    command: 'removeFormat',
    arg: null
  };

  render() {
    return (
      <button
        type="button"
        className="btn btn-xs btn-default"
        style={{width: '30px'}}
        onClick={this.handlesOnClick}>
        <i className="fa fa-eraser"></i>
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

RemoveFormat.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default RemoveFormat;
