import React, { PureComponent, PropTypes } from 'react';
import cx from 'classnames';

class AsideRight extends PureComponent {
  render() {
    const { isAnimated, isExpanded, children } = this.props;

    return (
      <aside
        className={
          cx({
            'right-side': true,
            'right-side--top-margin': true,
            'aside-right-animated': isAnimated,
            'strech': isExpanded
          })
        }>
        { children }
      </aside>
    );
  }
}

AsideRight.propTypes = {
  children: PropTypes.node.isRequired,
  isAnimated: PropTypes.bool,
  isExpanded: PropTypes.bool
};

AsideRight.defaultProps = {
  isAnimated: false,
  isExpanded: false
};

export default AsideRight;
