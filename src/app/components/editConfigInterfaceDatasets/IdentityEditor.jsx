import React, {
  PureComponent,
  PropTypes
}                   from 'react';
import Toggle       from 'react-toggle';


class IdentityEditor extends PureComponent {
  static propTypes = {
    onUpdate: PropTypes.func.isRequired
  };

  render() {
    const { row: { nullable } } = this.props;

    return (
      <div
        style={{
          paddingLeft: '40px',
          paddingTop: '10px'
        }}>
        <Toggle
          defaultChecked={nullable}
          icons={false}
          onChange={this.handlesOnSwitch}
        />
      </div>
    );
  }

  focus() {
    // this method is needed for react-bootstrap-table
  }

  handlesOnSwitch = event => {
    const { onUpdate } = this.props;
    const value = event.target.checked;
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(
      () => {
        onUpdate(value);
      }, 400
    );
  }
}

export default IdentityEditor;
