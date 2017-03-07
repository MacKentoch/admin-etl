import React, { PureComponent, PropTypes } from 'react';

export default class TabContentTitle extends PureComponent {
  static propTypes = {
    title: PropTypes.node
  };

  render() {
    const { title } = this.props;
    return (
      <div className="well">
        {title}
      </div>
    );
  }
}
