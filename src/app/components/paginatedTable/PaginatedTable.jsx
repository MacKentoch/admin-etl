import React, {
  PureComponent,
  PropTypes
}                           from 'react';
import moment               from 'moment';
import ListControl          from './listControl/ListControl.jsx';
import Table                from './table/Table.jsx';


const defaultNumberRowsPerPage = 50;

class PaginatedTable extends PureComponent {
  state = {
    // table headers
    headers: [],
    // table content
    rows: [],
    // pagination
    filter: '',
    currentPageRows: [],
    currentPage: 1
    // numberRowsPerPage: defaultNumberRowsPerPage
  };

  componentDidMount() {
    const { rows } = this.props;
    this.refreshRows([...rows]);
  }

  componentWillReceiveProps(nextProps) {
    const { lastRowsUpdateTime } = this.props;
    // update from props on "a date + time indicating rows refreshed"
    // (can handle non immutables rows like that)
    const rowsAreUpdated = moment(nextProps.lastRowsUpdateTime)
                                .diff(moment(lastRowsUpdateTime));

    if (rowsAreUpdated > 0 || (this.state.rows < nextProps.rows.length) && nextProps.rows.length > 0) {
      const { rows } = nextProps;
      this.setState({ rows: [...rows] });   // force all rows to refresh
      this.refreshRows([...rows]);  // force paginated rows to refresh
    }
  }

  render() {
    const { currentPageRows, currentPage, filter } = this.state;
    const { numberRowsPerPage, noDataContent, rows } = this.props;
    const { headers, onRowSelection } = this.props;
    const { tableHoverStyle, tableBorderStyle } = this.props;

    const minPage = getPaginationMinIndex(currentPageRows, currentPage, numberRowsPerPage);
    const maxPage = getPaginationMaxIndex(currentPageRows, currentPage, numberRowsPerPage);

    let totalRows;
    if (filter.trim().length > 0) {
      const regexFilter = new RegExp(filter, 'gi');
      totalRows =  rows.filter(row => row.columns.some(col => regexFilter.test(col.value))).length;
    } else {
      totalRows = rows.length;
    }
    const totalNbPages = getTotalNumberOfPages(totalRows, numberRowsPerPage);

    return (
      <div>
        <div className="panel">
          <div
            className="panel-body"
            style={{
              paddingTop:     0,
              paddingBottom:  0,
              paddingLeft:    '0px',
              paddingRight:   '0px'
            }}>
            <div className="box box-primary">
              <div
                className="box-body no-padding">

                <ListControl
                  onSearch={this.handlesOnSearch}
                  showCheckToggle={false}
                  totalPages={totalNbPages}
                  currentPageNb={currentPage}
                  minPage={minPage}
                  maxPage={maxPage}
                  total={totalRows}
                  onPagingPreviousClick={this.handlesOnPagingPreviousClick}
                  onPagingNextClick={this.handlesOnPagingNextClick}
                />

                <div className="table-responsive">
                  <Table
                    headers={headers}
                    rows={currentPageRows}
                    tableHoverStyle={tableHoverStyle}
                    tableBorderStyle={tableBorderStyle}
                    onRowClick={onRowSelection}
                    noDataContent={noDataContent}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  refreshRows = (rows) => {
    const { currentPage, filter } = this.state;
    const { searchProps, numberRowsPerPage } = this.props;

    const currentPageRows = getCurrentPageRows(rows, currentPage, numberRowsPerPage, filter, searchProps);
    this.setState({ rows, currentPageRows });
  }

  handlesOnPagingPreviousClick = (event) => {
    event.preventDefault();

    const { rows, searchProps, numberRowsPerPage } = this.props;
    const { currentPage, filter } = this.state;

    const previousPage    = currentPage - 1 > 0 ? currentPage - 1 : currentPage;
    const currentPageRows = getCurrentPageRows(rows, previousPage, numberRowsPerPage, filter, searchProps);

    this.setState({ currentPageRows, currentPage: previousPage });
  }

  handlesOnPagingNextClick = (event) => {
    event.preventDefault();

    const { rows, searchProps, numberRowsPerPage } = this.props;
    const { currentPage, filter } = this.state;

    let totalRows;
    if (filter.trim().length > 0) {
      const regexFilter = new RegExp(filter, 'gi');
      totalRows =  rows.filter(row => row.columns.some(col => regexFilter.test(col.value))).length;
    } else {
      totalRows = rows.length;
    }

    const pageMax = Math.ceil(totalRows / numberRowsPerPage);

    const nextPage = currentPage + 1 <= pageMax ? currentPage + 1 : currentPage;
    const currentPageRows = getCurrentPageRows(rows, nextPage, numberRowsPerPage, filter, searchProps);

    this.setState({ currentPageRows, currentPage: nextPage });
  }

  handlesOnSearch = (filter) => {
    const { rows, searchProps, numberRowsPerPage } = this.props;
    // const { currentPage } = this.state;

    const currentPageRows = getCurrentPageRows(rows, 1, numberRowsPerPage, filter, searchProps);

    this.setState({ currentPageRows, filter, currentPage: 1 });
  }
}

PaginatedTable.propTypes = {
  // table style:
  tableBorderStyle: PropTypes.bool,
  tableHoverStyle: PropTypes.bool,


  // headers
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      width: PropTypes.number,
      value: PropTypes.any.isRequired
    }).isRequired
  ),

  // rows
  lastRowsUpdateTime: PropTypes.string.isRequired, // idea behind is to set a datetime to rows to ensure to detect rows update even if non immutable
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      columns: PropTypes.arrayOf(
        PropTypes.shape({
          isSearchable: PropTypes.bool,
          width: PropTypes.number,
          value: PropTypes.any.isRequired
        }).isRequired
      )
    })
  ),
  onRowSelection: PropTypes.func.isRequired,

  // pagination & search:
  numberRowsPerPage: PropTypes.number,
  searchProps: PropTypes.arrayOf(PropTypes.string), // row inner object properties to compare to search input value

  // no data content
  noDataContent: PropTypes.node
};

PaginatedTable.defaultProps = {
  // table style:
  tableBorderStyle: true,
  tableHoverStyle: true,

  // pagination & search:
  numberRowsPerPage: defaultNumberRowsPerPage,

  // no data content
  noDataContent: (
    <h3>
      <i>
        no content...
      </i>
    </h3>
  )
};

export default PaginatedTable;

/**
 * filter current page content depending on pagination
 * @param  {[Object]} rows                                        [description]
 * @param  {Number} [page=1]                                      [description]
 * @param  {Number} [pageSize=defaultNumberRowsPerPage]           [description]
 * @param  {String} [filter='']                                   [description]
 * @param  {[String]} [searchProps=[]]                            [description]
 * @return {[Object]}                                             [description]
 */
function getCurrentPageRows(rows, page = 1, pageSize = defaultNumberRowsPerPage, filter = '', searchProps = []) {
  if (!Array.isArray(rows)) {
    return [];
  }

  const total = rows.length;

  // /////////////////////////////////////////
  // 1) no pagination case
  // /////////////////////////////////////////
  if (total <= pageSize - 1) {
    if (filter.trim().length > 0 && searchProps.length > 0) {
      // 1.a) with filter case:
      const regexFilter = new RegExp(filter, 'gi');
      return rows.filter(row => row.columns.some(col => regexFilter.test(col.value)));
    } else {
      // 1.b) no filter case:
      return rows;
    }
  }

  const minIdx  = (page - 1) * pageSize;
  const maxIdx  = (page * pageSize) - 1;

  // /////////////////////////////////////////
  // 2) with pagination case
  // /////////////////////////////////////////
  if (filter.trim().length > 0 && searchProps.length > 0) {
    // 2.a) with filter case:
    const regexFilter = new RegExp(filter, 'gi');

    const res = rows
            .filter(row => row.columns.some(col => regexFilter.test(col.value)))
            .filter((_, rowIdx) => (rowIdx >= minIdx && rowIdx <= maxIdx) ? true : false);
    // console.log('rows: ', res);
    return res;
  } else {
    // 2.b) no filter case:
    return rows.filter((_, rowIdx) => (rowIdx >= minIdx && rowIdx <= maxIdx) ? true : false);
  }
}

function getTotalNumberOfPages(totalRows = 0, pageSize = defaultNumberRowsPerPage) {
  if (totalRows <= 0) {
    return 0;
  }

  if (pageSize <= 0) {
    return 0;
  }

  return Math.ceil(totalRows / pageSize);
}

function getPaginationMinIndex(rows, page = 1, pageSize = defaultNumberRowsPerPage) {
  if (!Array.isArray(rows)) {
    return 1;
  }

  const total   = rows.length;
  if (total <= pageSize - 1) {
    return 1;
  }

  return ((page - 1) * pageSize) + 1;
}

function getPaginationMaxIndex(rows, page = 1, pageSize = defaultNumberRowsPerPage) {
  if (!Array.isArray(rows)) {
    return 1;
  }

  const total = rows.length;
  if (total <= pageSize - 1) {
    return total;
  }

  return (page * pageSize);
}
