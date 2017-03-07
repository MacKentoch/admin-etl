import React, {
  PureComponent,
  PropTypes
}                       from 'react';

class InsertOrderedList extends PureComponent {
  state = {
    command: 'insertOrderedList',
    arg: null
  };

  render() {
    return (
      <button
        type="button"
        className="btn btn-default"
        style={{width: '30px'}}
        onClick={this.handlesOnClick}>
        <i className="fa fa-list-ol"></i>
      </button>
    );
  }

  handlesOnClick= (event) => {
    event.preventDefault();

    const { command } = this.state;
    const { onClick } = this.props;

    onClick(command);
  }
}

InsertOrderedList.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default InsertOrderedList;
