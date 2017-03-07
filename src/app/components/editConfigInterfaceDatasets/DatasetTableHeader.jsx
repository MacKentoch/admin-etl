import React, { PureComponent } from 'react';
import {
  Grid,
  Row,
  Col
}                                       from 'react-bootstrap';

class DatasetTableHeader extends PureComponent {
  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12}>
            <div className="alert alert-info">
              <h3 className="text-center">
                <i className="fa fa-table" aria-hidden="true" />&nbsp;
                All datasets
              </h3>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default DatasetTableHeader;
