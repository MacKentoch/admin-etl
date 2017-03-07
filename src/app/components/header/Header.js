import React, { PureComponent, PropTypes } from 'react';
import UserMenu             from './userMenu/UserMenu';
import SearchButton         from './searchButton/SearchButton';
import { Link }             from 'react-router';
import SuperAdminMenu       from './superAdminMenu/SuperAdminMenu';
import cx                   from 'classnames';

class Header extends PureComponent {
  render() {
    const {
      appName,
      toggleSideMenu
      // userLogin,
      // userFirstname,
      // userLastname,
      // userPicture,
      // showPicture,
      // onSearchClick
    } = this.props;
    return (
      <header
        className={
          cx({
            header: true,
            'shadow--2dp': true,
            'fixed--header': true,
            'no-print': true
          })
        }>
        <a href="#"
          className="logo">
          { appName }
        </a>
        <nav
          className="navbar navbar-static-top"
          role="navigation">
          <Link
            to="/"
            onClick={toggleSideMenu}
            className="navbar-btn sidebar-toggle"
            data-toggle="offcanvas"
            role="button">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </Link>
          <div className="navbar-right">
            <ul className="nav navbar-nav">
              {/* <SearchButton
                onClick={onSearchClick}
              /> */}
              {/* <SuperAdminMenu
                title={'Menu Super Administrateur'}
              /> */}
              {/* <UserMenu
                login={userLogin}
                firstname={userFirstname}
                lastname={userLastname}
                picture={userPicture}
                showUserPicture={showPicture}
              /> */}
            </ul>
          </div>
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  appName: PropTypes.string,

  userLogin: PropTypes.string,
  userFirstname: PropTypes.string,
  userLastname: PropTypes.string,
  userPicture: PropTypes.string,
  showPicture: PropTypes.bool,

  currentView: PropTypes.string,
  toggleSideMenu: PropTypes.func,

  onSearchClick: PropTypes.func
};

Header.defaultProps = {
  appName: 'applicationName'
};

export default Header;
