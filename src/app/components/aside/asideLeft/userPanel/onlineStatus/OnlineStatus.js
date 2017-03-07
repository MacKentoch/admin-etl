'use strict';

import React, { PropTypes } from 'react';

const OnlineStatus = (props) => {
  if (props.showStatus === true) {
    return (
      <a
        href="#">
        { props.online &&
          <i className="fa fa-circle text-success"></i>
        }
        { props.online &&
          props.connectionStatus.online
        }
        {
          !props.online &&
          <i className="fa fa-circle text-default"></i>
        }
        { !props.online &&
          props.connectionStatus.disconnected
        }
      </a>
    );
  }
  return (<div></div>);
};

OnlineStatus.propTypes = {
  showStatus: PropTypes.bool,
  online: PropTypes.bool,
  connectionStatus: PropTypes.shape({
    online: PropTypes.string,
    disconnected: PropTypes.string
  })
};

OnlineStatus.defaultProps = {
  showStatus: false,
  online: false,
  connectionStatus: {
    online: 'Online',
    disconnected: 'Disconnected'
  }
};

export default OnlineStatus;
