import React, { PureComponent, PropTypes } from 'react';
import {
  // Grid,
  Row,
  Col,
  Button
}                                       from 'react-bootstrap';

class DatasetColumnTableHeader extends PureComponent {
  static propTypes = {
    datasetName: PropTypes.string,
    backToDatasetsTables: PropTypes.func.isRequired
  };

  static defaultProps = {
    datasetName: ''
  };

  render() {
    const { datasetName } = this.props;
    return (
      <Row>
        <Col xs={2}>
          <div style={{ padding: '20px' }}>
            <Button
              bsStyle="primary"
              bsSize="large"
              className="orange_button"
              onClick={this.goBackToDatasetTable}>
              <i className="fa fa-arrow-left" aria-hidden="true" />&nbsp;
              back to datasets list
            </Button>
          </div>
        </Col>
        <Col xs={8}>
          <div className="alert alert-info">
            <h3 className="text-center">
              <i className="fa fa-columns" aria-hidden="true" />&nbsp;
              <b>
                {String(datasetName).toUpperCase()}
              </b>&nbsp;
              Columns configuration
            </h3>
          </div>
        </Col>
      </Row>
    );
  }

  goBackToDatasetTable = () => {
    const  { backToDatasetsTables } = this.props;
    backToDatasetsTables();
  }
}

export default DatasetColumnTableHeader;
