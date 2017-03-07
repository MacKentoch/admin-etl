/* eslint no-console: 0 */
import React, {
  PureComponent,
  PropTypes
}                     from 'react';
import cx             from 'classnames';
import  Horloge       from '../../horloge/Horloge';
import Menu           from './menu/Menu';
import Immutable      from 'immutable';

class AsideLeft extends PureComponent {
  render() {
    const {
      currentView,
      isAnimated,
      isCollapsed,
      sideNavMenus
    } = this.props;

    return (
      <aside
        className={cx({
          'no-print': true,
          'left-side': true,
          'aside-left--fixed': true,
          'sidebar-offcanvas': true,
          'sidebar-animated': isAnimated,
          'collapse-left':    isCollapsed,
          'shadow--2dp': true
        })}
        style={{
          height: '100%',
          overflow: 'auto',
          position: 'fixed'
        }}
        >
        <section className="sidebar">
          <Horloge />
          <div>
            {
              sideNavMenus.map(
                (group, groupIdx) => (
                  <Menu
                    key={groupIdx}
                    headerTitle={group.get('groupe')}
                    activeView={currentView}
                    views={group.get('menus')}
                  />
                )
              )
            }
          </div>
        </section>
      </aside>
    );
  }
}

AsideLeft.propTypes = {
  isFetching: PropTypes.bool,
  isAnimated: PropTypes.bool,
  isCollapsed: PropTypes.bool,
  currentView: PropTypes.string,
  connectionStatus: PropTypes.instanceOf(Immutable.Iterable),
  userIsConnected: PropTypes.bool,
  username: PropTypes.string,
  userPicture: PropTypes.string,
  showPicture: PropTypes.bool,
  helloWord: PropTypes.string,
  sideNavMenus: PropTypes.instanceOf(Immutable.Iterable)
};

AsideLeft.defaultProps = {
  isAnimated: false,
  isCollapsed: false,
  isFetching: true
};

export default AsideLeft;
