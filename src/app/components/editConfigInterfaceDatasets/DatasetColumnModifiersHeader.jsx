import React, { PureComponent, PropTypes } from 'react';
import {
  // Grid,
  Row,
  Col,
  Button
}                                       from 'react-bootstrap';

class DatasetColumnModifiersHeader extends PureComponent {
  static propTypes = {
    columnName:           PropTypes.string,
    datasetId:            PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    datasetName:          PropTypes.string.isRequired,
    backToColumnsTables:  PropTypes.func.isRequired
  };

  static defaultProps = {
    columnName: ''
  };

  render() {
    const { columnName } = this.props;
    return (
      <Row>
        <Col xs={2}>
          <div style={{ padding: '20px' }}>
            <Button
              bsStyle="primary"
              bsSize="large"
              className="orange_button"
              onClick={this.goBackColDescTable}>
              <i className="fa fa-arrow-left" aria-hidden="true" />&nbsp;
              back to columns list
            </Button>
          </div>
        </Col>
        <Col xs={8}>
          <div className="alert alert-info">
            <h3 className="text-center">
              <i className="fa fa-columns" aria-hidden="true" />&nbsp;
              <b>
                {String(columnName).toUpperCase()}
              </b>&nbsp;
              Column modifiers
            </h3>
          </div>
        </Col>
      </Row>
    );
  }

  goBackColDescTable = () => {
    const  { backToColumnsTables, datasetId, datasetName } = this.props;
    backToColumnsTables({ datasetId, datasetName });
  }
}

export default DatasetColumnModifiersHeader;
