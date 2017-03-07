import React, {
  PureComponent,
  PropTypes
}                           from 'react';

class ListControl extends PureComponent {
  state = { searchValue: '' };;

  render() {
    const {
      minPage,
      maxPage,
      totalPages,
      currentPageNb,
      onPagingPreviousClick,
      onPagingNextClick,
      isEditingRows
    } = this.props;

    const { searchValue } = this.state;

    return (
      <div
        className="row"
        style={{marginLeft: '5px', marginRight: '5px'}}>
        <div
          className="col-xs-12"
          style={{display: 'block', padding: '5px'}}>
          {/* search */}
          <div className="has-feedback pull-left">
            <input
              type="text"
              readOnly={isEditingRows}
              className="form-control input-sm"
              style={{width: '250px'}}
              placeholder="Rechercher"
              value={searchValue}
              onChange={this.handlesOnSearchChange}
              onKeyPress={this.handlesOnSearchKeyPress}
            />
            <span className="glyphicon glyphicon-search form-control-feedback"></span>
          </div>
          {/* paginate */}
          <div className="pull-right">
            <span>
              page {currentPageNb} on {totalPages}
            </span>
            &nbsp;
            <div className="btn-group">
              <button
                type="button"
                disabled={isEditingRows}
                className="btn btn-default btn-sm"
                onClick={onPagingPreviousClick}>
                <i className="fa fa-chevron-left"></i>
              </button>
              <button
                type="button"
                disabled={isEditingRows}
                className="btn btn-default btn-sm"
                onClick={onPagingNextClick}>
                <i className="fa fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handlesOnSearchChange = (event) => {
    event.preventDefault();

    const {onSearch} = this.props;
    const newValue = event.target.value.trim();
    this.setState({ searchValue: newValue });

    if (newValue) {
      onSearch(newValue);
    }

    if (newValue.trim().length === 0) {
      // remove search filter
      onSearch('');
    }
  }

  handlesOnSearchKeyPress = (event) => {
    const key = event.which || event.keyCode;
    if (key === 13) {
      const {onSearch} = this.props;
      const value = event.target.value.trim();
      if (value) {
        onSearch(value);
      }
    }
  }
}

ListControl.propTypes = {
  minPage: PropTypes.number.isRequired,
  maxPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  currentPageNb: PropTypes.number.isRequired,

  onPagingPreviousClick: PropTypes.func.isRequired,
  onPagingNextClick: PropTypes.func.isRequired,

  showCheckToggle: PropTypes.bool,

  onSearch: PropTypes.func.isRequired,

  isEditingRows: PropTypes.bool
};

ListControl.defaultProps  ={
  showCheckToggle: false,
  showReply: false,
  showForward: false,
  isEditingRows: false
};

export default ListControl;
