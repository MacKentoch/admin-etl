import React, {
  PureComponent,
  PropTypes
}                       from 'react';
import ViewLink         from './viewLink/ViewLink';
import Immutable        from 'immutable';

class MenuLinks extends PureComponent {
  render() {
    const { activeView, views } = this.props;
    return (
      <ul className="sidebar-menu sidebar-menu__marginTop">
        {
          views.map(
            (view, idx) => {
              // {name, linkTo, faIconName, itemCount}
              return (
                <ViewLink
                  key={idx}
                  isActive={activeView === view.get('name')}
                  linkTo={view.get('linkTo')}
                  viewName={view.get('name')}
                  faIconName={view.get('faIconName')}
                  itemCount={view.get('itemCount') ? view.get('itemCount') : 0}
                />
              );
            }
          )
        }
      </ul>
    );
  }
}

MenuLinks.propTypes = {
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

export default MenuLinks;
