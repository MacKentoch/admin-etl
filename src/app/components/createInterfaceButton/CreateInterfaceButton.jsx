import React, {
  PureComponent,
  PropTypes
}                     from 'react';
import {
  Grid,
  Row,
  Col,
  Button
}                     from 'react-bootstrap';

export default class CreateInterfaceButton extends PureComponent {
  static proptypes = {
    buttonText: PropTypes.string,
    onClick: PropTypes.func
  };

  static defaultProps = {
    buttonText: 'button'
  };

  render() {
    const { buttonText } = this.props;

    return (
      <Grid style= {{marginBottom: '20px'}}>
        <Row>
          <Col xs={12}>
            <Button
              block
              className="orange_button"
              bsStyle="primary">
              { buttonText }
            </Button>
          </Col>
        </Row>
      </Grid>
    );
  }

  handlesOnClick = (event) => {
    const { onClick } = this.props;
    onClick(event);
  }
}
