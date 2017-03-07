import React, { PropTypes } from 'react';
import cx                   from 'classnames';

const SearchBenefLink = ({isActive, onSearchClick, viewName, faIconName}) => {
  return (
    <li
      className={cx({'active': isActive})}
      >
      <a
        href="#"
        onClick={onSearchClick}>
        <i
          className={`fa ${faIconName}`}
          style={{marginLeft: '10px'}}>
        </i>
        <span style={{fontSize: '13px'}}>
          {viewName}
        </span>
      </a>
    </li>
  );
};

SearchBenefLink.propTypes = {
  isActive: PropTypes.bool,
  viewName: PropTypes.string.isRequired,
  onSearchClick: PropTypes.func.isRequired,
  faIconName: PropTypes.string.isRequired
};

SearchBenefLink.defaultProps = {
  isActive: false
};

export default SearchBenefLink;
