import React, {
  PureComponent,
  PropTypes
}                   from 'react';
// import Toggle       from 'react-toggle';
import Switch       from '../../components/switch/Switch';

class IdentityModalEditor extends PureComponent {
  static propTypes = {
    onUpdate: PropTypes.func.isRequired
  };

  state = {
    open: true,
    value: true
  };

  // componentDidMount() {
  //   const { defaultValue } = this.props;
  //   const { value } = this.state;
  //   if (value !== defaultValue) {
  //     this.setDefaultValue(defaultValue);
  //   }
  // }

  render() {
    const { row: { identity } } = this.props;
    const { open } = this.state;

    const fadeIn = open ? 'in' : '';
    const display = open ? 'block' : 'none';

    return (
      <div
        className={ `modal fade ${fadeIn}` }
        id="myModal"
        role="dialog"
        style={ { display } }>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">
              <div
                className="block-center">
                <div className="row">
                  <div className="col-xs-6">
                    <h4 className="text-right">
                      <b>
                        column is identity:
                      </b>
                    </h4>
                  </div>
                  <div className="col-xs-6">
                    <div
                      style={{
                        paddingTop: '10px'
                      }}>
                      <Switch
                        setFocus
                        on={identity}
                        onClick={this.handlesOnSwitch}
                      />
                      {/* <Toggle
                        defaultChecked={identity}
                        icons
                        onChange={this.handlesOnSwitch}
                      /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={ this.handlesUpdateData }>
                Valid
              </button>
              <button
                type="button"
                className="btn btn-default"
                onClick={ this.close }>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  setDefaultValue = value => (this.setState({ value }))

  focus() {
    // this method is needed for react-bootstrap-table
  }

  handlesUpdateData = (event) => {
    event.preventDefault();
    const { onUpdate } = this.props;
    const { value } = this.state;
    onUpdate(value);
  }

  handlesOnSwitch = event => {
    const value = event; // .target.checked;
    this.setState({ value });
  }

  close = () => {
    const { defaultValue, onUpdate } = this.props;
    this.setState({ open: false });
    onUpdate(defaultValue);
  }
}

export default IdentityModalEditor;
