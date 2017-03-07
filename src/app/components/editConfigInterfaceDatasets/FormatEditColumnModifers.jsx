import React, { PureComponent, PropTypes } from 'react';
import { Button } from 'react-bootstrap';

class FormatEditColumnModifers extends PureComponent {
  static propTypes = {
    cell:         PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    columnId:     PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    columnName:   PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onClick:      PropTypes.func.isRequired
  };

  render() {
    return (
      <div className="">
        <Button
          bsStyle="info"
          onClick={this.handlesOnEditDatasetColumns}>
          <i className="fa fa-pencil" aria-hidden="true" />
        </Button>
      </div>
    );
  }

  handlesOnEditDatasetColumns = (event) => {
    if (event) {
      event.preventDefault();
    }
    const { onClick, columnId, columnName } = this.props;
    onClick({ columnId, columnName });
  }
}

export default FormatEditColumnModifers;
