import React, {
  PureComponent,
  PropTypes
}                       from 'react';

class InsertUnorderedList extends PureComponent {
  state = {
    command: 'insertUnorderedList',
    arg: null
  };

  render() {
    return (
      <button
        type="button"
        className="btn btn-default"
        style={{width: '30px'}}
        onClick={this.handlesOnClick}>
        <i className="fa fa-list-ul"></i>
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

InsertUnorderedList.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default InsertUnorderedList;
