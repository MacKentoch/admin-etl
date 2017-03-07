import React, { PureComponent, PropTypes } from 'react';
import { Button } from 'react-bootstrap';

class FormatEditColumn extends PureComponent {
  static propTypes = {
    cell:       PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    datasetId:  PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    datasetName:PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onClick:    PropTypes.func.isRequired
  };

  render() {
    const { cell } = this.props;

    return (
      <div style={{ display: 'block'}}>
        <span
          className="pull-left"
          style={{marginTop: '5px'}}>
          <b>
            {cell}
          </b> col.
        </span>
        <div className="pull-right">
          <Button
            bsStyle="info"
            onClick={this.handlesOnEditDatasetColumns}>
            <i className="fa fa-pencil" aria-hidden="true" />
          </Button>
        </div>
      </div>
    );
  }

  handlesOnEditDatasetColumns = (event) => {
    if (event) {
      event.preventDefault();
    }
    const { onClick, datasetId, datasetName } = this.props;
    onClick({ datasetId, datasetName });
  }
}

export default FormatEditColumn;
