import React, {
  PropTypes
}                   from 'react';

const SuperAdminMenu = ({title}) => {
  return (
    <li className="dropdown tasks-menu">
        <a
          href="#"
          className="dropdown-toggle"
          data-toggle="dropdown">
          <i className="fa fa-cogs text-danger"></i>
        </a>
        <ul className="dropdown-menu">
          <li className="header">
            { title }
          </li>
          <li>
            {/* <!-- inner menu: contains the actual data --> */}
            <ul className="menu">

              <li>
                <a
                  className="superadmin-menu"
                  href="#">
                  <h3>
                    <i className="fa fa-users"></i>
                    &nbsp;
                    <span className="superadmin-titre__menu">
                      gestion des habilitations
                    </span>
                  </h3>
                </a>
              </li>

              <li>
                <a
                  className="superadmin-menu"
                  href="#">
                  <h3>
                    <i className="fa fa-map-signs"></i>
                    &nbsp;
                    <span className="superadmin-titre__menu">
                      gestion des motifs
                    </span>
                  </h3>
                </a>
              </li>

            </ul>
          </li>
      </ul>
    </li>
  );
};

SuperAdminMenu.propTypes = {
  title: PropTypes.string
};

SuperAdminMenu.defaultProps = {
  title: 'Super Administration'
};

export default SuperAdminMenu;
