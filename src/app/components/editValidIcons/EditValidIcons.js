import React, { PropTypes } from 'react';
import { Motion, spring }   from 'react-motion';


const EditValidIcons = ({
  isEditing,
  saveEdit,
  cancelEditing,
  setEdit,
  isCollapsed,
  toggleCollapse
}) => {
  return (
    <span className="pull-right">
      {
        isEditing
        ?
        <span>
          <button
            className="btn btn-success btn-sm"
            onClick={saveEdit}>
            <i
              className="fa fa-check text-blanc">
            </i>
          </button>
          &nbsp;
          <button
            className="btn btn-default btn-sm"
            onClick={cancelEditing}>
            <i
              className="fa fa-times text-blanc">
            </i>
          </button>
          &nbsp;
        </span>
        :
        <button
          className="btn orange_button btn-sm"
          onClick={setEdit}>
          <i
            className="fa fa-pencil text-blanc">
          </i>
        </button>
      }
      &nbsp;
      <button
        className="btn orange_button btn-sm"
        onClick={toggleCollapse}>
        <Motion
          style={{ deg: isCollapsed ? spring(0) : spring(180) }} >
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

EditValidIcons.propTypes = {
  isEditing: PropTypes.bool,
  setEdit: PropTypes.func.isRequired,
  saveEdit: PropTypes.func.isRequired,
  cancelEditing: PropTypes.func.isRequired,
  isCollapsed: PropTypes.bool.isRequired,
  toggleCollapse: PropTypes.func.isRequired
};

EditValidIcons.defaultProps= {
  isEditing: false
};

export default EditValidIcons;
