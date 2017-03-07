import React, { PropTypes } from 'react';

const SearchButton = ({onClick}) => {
  return (
    <li className="tasks-menu">
        <a
          href="#"
          onClick={onClick}
          className="dropdown-toggle"
          data-toggle="dropdown">
          <i className="fa fa-search"></i>
        </a>
      </li>
    );
};

SearchButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default SearchButton;
