import React, {
  PureComponent,
  PropTypes
}                       from 'react';

class Bold extends PureComponent {
  state = {
    command: 'bold',
    arg: null
  };

  render() {
    return (
      <button
        type="button"
        className="btn btn-default"
        style={{width: '30px'}}
        onClick={this.handlesOnClick}>
        <i className="fa fa-bold"></i>
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

Bold.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default Bold;
