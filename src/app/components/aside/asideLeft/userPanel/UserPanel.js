import React, { PropTypes } from 'react';
import OnlineStatus         from './onlineStatus/OnlineStatus';
import NameLoading          from './nameLoading/NameLoading';

const UserPanel = ({isFetching, showUserPicture, userPicture, hello, username}) => {
  return (
    <div className="user-panel">
      {
        showUserPicture &&
        <div className="pull-left image">
          <img
            src={userPicture}
            className="img-circle"
            alt="User Image"
          />
        </div>
      }
      {
        isFetching &&
        <div
          className="center-block"
          style={{width: '60px', height: '34px'}}>
          <NameLoading />
        </div>
      }
      {
        !isFetching &&
        <div className="pull-left info">
          <p>
            { `${hello} ${username}` }
          </p>
          <OnlineStatus
            showStatus={false}
          />
        </div>
      }
    </div>
  );
};

UserPanel.propTypes = {
  isFetching: PropTypes.bool,
  hello: PropTypes.string,
  username: PropTypes.string,
  showUserPicture: PropTypes.bool,
  userPicture: PropTypes.any,
  connectionStatus: PropTypes.shape({
    online: PropTypes.string,
    disconnected: PropTypes.string
  }),
  online: PropTypes.bool
};

UserPanel.defaultProps = {
  isFetching: true,
  hello: 'Hello',
  username: 'Jane',
  connectionStatus: {
    online: 'Online',
    disconnected: 'Disconnected'
  },
  online: false,
  showUserPicture: false
};

export default UserPanel;
