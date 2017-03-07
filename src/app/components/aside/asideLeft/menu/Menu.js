import React, {
  PureComponent,
  PropTypes
}                     from 'react';
import Collapse       from 'react-collapse';
import MenuHeader     from './menuHeader/MenuHeader';
import MenuLinks      from './menuLinks/MenuLinks';
import Immutable      from 'immutable';

class Menu extends PureComponent {
  state = { isCollapsed: false }

  render() {
    const { headerTitle, activeView, views  } = this.props;
    const { isCollapsed } = this.state;
    return (
      <div>
        <MenuHeader
          title={headerTitle}
          isCollapsed={!isCollapsed}
          onClick={this.handlesCollapseClick}
        />
        <Collapse
          isOpened={!isCollapsed}
          keepCollapsedContent={false}>
          <MenuLinks
            activeView={activeView}
            views={views}
          />
        </Collapse>
      </div>
    );
  }

  handlesCollapseClick = (evt) => {
    evt.preventDefault();
    const { isCollapsed } = this.state;
    this.setState({ isCollapsed: !isCollapsed });
  }
}

Menu.propTypes = {
  headerTitle: PropTypes.string.isRequired,
  activeView: PropTypes.string.isRequired,
  views: PropTypes.instanceOf(Immutable.Iterable).isRequired
  // views: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     name: PropTypes.string.isRequired,
  //     linkTo: PropTypes.string.isRequired,
  //     faIconName: PropTypes.string.isRequired,
  //     itemCount: PropTypes.number
  //   })
  // ).isRequired
};

export default Menu;
