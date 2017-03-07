import React, { PureComponent, PropTypes } from 'react';
import {
  Button,
  Tooltip,
  OverlayTrigger
}                                       from 'react-bootstrap';

class InputFormClearBtn extends PureComponent {
  static propTypes = {
    name:     PropTypes.string,
    onClick:  PropTypes.func.isRequired
  };

  static defaultProps = {
    name: ''
  };

  render() {
    const { name } = this.props;

    return (
      <OverlayTrigger
        placeholder="bottom"
        overlay={(
          <Tooltip id={`tooltipReset-${name}`}>
            <strong>
            {`Clear "${name}"`}
            </strong>
          </Tooltip>
        )}>
        <Button
          tabIndex="-1"
          bsStyle="danger"
          onClick={this.handlesOnClick}>
          <i
            className="fa fa-eraser"
            aria-hidden="true"
          />
        </Button>
      </OverlayTrigger>
    );
  }

  handlesOnClick = event => {
    if (event) {
      event.preventDefault();
    }
    const { onClick, name } = this.props;
    onClick(name);
  }
}

export default InputFormClearBtn;
