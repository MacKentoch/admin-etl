/* eslint react/prop-types:0  */ // due to bug destructuring confusion with proptype in motion content

import React, { PropTypes } from 'react';
import { Motion, spring }   from 'react-motion';


const ToggleCollapse = ({ isCollapsed, toggleCollapse }) => {
  return (
    <span className="pull-right">
      <button
        className="btn orange_button btn-sm"
        onClick={toggleCollapse}>
        <Motion
          style={{
            deg: isCollapsed ? spring(0) : spring(180)
          }} >
          {
            ({ deg }) => {
              return (
                <i
                  className="fa fa-caret-down text-blanc"
                  style={{
                    transform: `rotate(${deg}deg)`,
                    WebkitTransform: `rotate(${deg}deg)`
                  }}
                  aria-hidden="true">
                </i>
              );
            }
          }
        </Motion>
      </button>
    </span>
  );
};

ToggleCollapse.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
  toggleCollapse: PropTypes.func.isRequired
};

ToggleCollapse.defaultProps = {
  isCollapsed: false
};

export default ToggleCollapse;
