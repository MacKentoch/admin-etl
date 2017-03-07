import React, {
  PropTypes,
  PureComponent
}                               from 'react';
import { bindActionCreators }   from 'redux';
import { connect }              from 'react-redux';
import * as userActions         from '../../redux/modules/user';
import * as viewsActions        from '../../redux/modules/views';
import * as sidemenuActions     from '../../redux/modules/sidemenu';
import * as notificationActions from '../../redux/modules/notification';
import * as editInterfaceActions from '../../redux/modules/editInterface';
import * as addNewInterfaceDatasetActions from '../../redux/modules/addNewInterfaceDataset';
import * as confirmDeleteModalActions from '../../redux/modules/confirmDeleteModal';
import Header                   from '../../components/header/Header';
import {AsideLeft, AsideRight}  from '../../components/aside';
import { appConfig }            from '../../config';
import { BackToTop }            from '../../components';
import { navigation }           from '../../models';
import NotificationSystem       from 'react-notification-system';
import Immutable, { fromJS, Map }    from 'immutable';
import EditInterfaceDataSetModal from '../../modals/editInterfaceDataSetModal/EditInterfaceDataSetModal.jsx';
import ConfirmDeleteModal        from '../../modals/confirmDeleteModal/ConfirmDeleteModal.jsx';

class App extends PureComponent {
  static propTypes = {
    // redux
    dispatch:   PropTypes.func,
    // router
    children:   PropTypes.node.isRequired,
    history:    PropTypes.object,
    location:   PropTypes.object,
    // sidemenu
    sideMenuIsCollapsed: PropTypes.bool,
    // userInfos
    userInfos: PropTypes.instanceOf(Immutable.Iterable),
    // userInfos: PropTypes.shape({
    //   login: PropTypes.string,
    //   firstname: PropTypes.string,
    //   lastname: PropTypes.string,
    //   picture: PropTypes.string,
    //   showPicture: PropTypes.bool
    // }),

    userInfoFetching: PropTypes.bool,
    userIsConnected: PropTypes.bool,
    // notification:
    notificationTime: PropTypes.string,
    // currentView
    currentView: PropTypes.string,
    // confirmDeleteModal
    confirmDeleteModalOpened: PropTypes.bool.isRequired,
    // actions
    actions: PropTypes.shape({
      // view
      enterHome: PropTypes.func,
      leaveHome: PropTypes.func,
      // user
      fetchUserInfoDataIfNeeded: PropTypes.func,
      // sideMenu
      openSideMenu:   PropTypes.func,
      closeSideMenu:  PropTypes.func,
      toggleSideMenu: PropTypes.func,
      // notifications
      addNotificationMessage:   PropTypes.func,
      // confirmDeleteModal
      openConfirmDeleteModal:    PropTypes.func,
      cancelConfirmDeleteModal:  PropTypes.func,
      confirmConfirmDeleteModal: PropTypes.func
    })
  };

  state = {
    sideNavMenus:         fromJS([...navigation.sideNavMenu]),
    connectionStatus:     Map(appConfig.CONNECTION_STATUS),
    appName:              appConfig.APP_NAME,
    helloWord:            appConfig.HELLO_WORD
  };

  componentWillMount() {
    window.addEventListener('resize', this.handlesOnWindowsResize);
  }

  componentDidMount() {
    const { actions: { fetchUserInfoDataIfNeeded } } = this.props;
    fetchUserInfoDataIfNeeded();
    this.handlesOnWindowsResize(); // force initail sidemenu collpase based screen size
  }

  componentWillReceiveProps(nextProps) {
    // notifications detection:
    const { notificationTime } = this.props;
    if (nextProps.notificationTime !== notificationTime) {
      // new notification added:
      const notification = {
        message: nextProps.notificationMessage,
        level: nextProps.notificationLevel
      };
      this.handlesAddNotification(notification);
    }
  }

  render() {
    const { sideNavMenus, appName, connectionStatus, helloWord } = this.state;
    const { userInfos, userInfoFetching, userIsConnected, currentView, children, sideMenuIsCollapsed } = this.props;
    const userFullName = `${userInfos.get('firstname')} ${userInfos.get('lastname').toUpperCase()}`;

    return (
      <div>
        <Header
          id="topHeader"
          appName={appName}
          userLogin={userInfos.get('login')}
          userFirstname={userInfos.get('firstname')}
          userLastname={userInfos.get('lastname')}
          userPicture={userInfos.get('picture')}
          showPicture={userInfos.get('showPicture')}
          currentView={currentView}
          toggleSideMenu={this.handlesMenuButtonClick}
        />
        <div
          id="appWrapper"
          className="wrapper row-offcanvas row-offcanvas-left">
          <AsideLeft
            isAnimated={true}
            currentView={currentView}
            isCollapsed={sideMenuIsCollapsed}
            helloWord={helloWord}
            connectionStatus={connectionStatus}
            userIsConnected={userIsConnected}
            username={userFullName}
            userPicture={userInfos.get('picture')}
            showPicture={userInfos.get('showPicture')}
            isFetching={userInfoFetching}
            sideNavMenus={sideNavMenus}
          />
          <AsideRight
            isAnimated={true}
            isExpanded={sideMenuIsCollapsed}>
            <div id="mainContainer">
              { children }
              <BackToTop
                minScrollY={40}
                scrollTo={'appWrapper'}
              />
            </div>
          </AsideRight>
        </div>
        {/* Notifications */}
        <NotificationSystem
          ref={this.getNotificationSystemRef}
        />
        {/* modals */}
        <EditInterfaceDataSetModal
          isOpened={this.props.addNewInterfaceDatasetOpened}
          interfaceId={this.props.addNewInterfaceDatasetInterfaceId}
          interfaceName={this.props.addNewInterfaceDatasetInterfaceName}
          addNotificationMessage={this.props.actions.addNotificationMessage}
          onCancel={this.props.actions.closeAddDataSetModal}
          insertNewDataset={this.props.actions.insertNewDataset}
          closeModal={this.props.actions.closeAddDataSetModal}
        />

        <ConfirmDeleteModal
          isOpened={this.props.confirmDeleteModalOpened}
          onConfirm={this.props.actions.confirmConfirmDeleteModal}
          onCancel={this.props.actions.cancelConfirmDeleteModal}
        />
      </div>
    );
  }

  getNotificationSystemRef = (ref) => (this.notificationSystem = ref)

  handlesOnWindowsResize = () => {
    const { actions: {closeSideMenu, openSideMenu} } = this.props;
    const screenSizeInf990px = this.isScreenSizeInf990px();

    if (screenSizeInf990px) {
      closeSideMenu();
    } else {
      openSideMenu();
    }
  }

  isScreenSizeInf990px = () => window.matchMedia('screen and (max-width: 990px)').matches

  isScreenSizeSup990px = () => window.matchMedia('screen and (min-width: 990px)').matches

  handlesAddNotification = (notification) => {
    if (!notification) {
      return;
    }
    if (!notification.message) {
      return;
    }
    if(!notification.level) {
      return;
    }
    this.notificationSystem.addNotification({...notification});
  }

  handlesMenuButtonClick = (event) => {
    event.preventDefault();
    const { actions: { toggleSideMenu } } = this.props;
    toggleSideMenu();
  }
}

const mapStateToProps = (state) => {
  return {
    // currentView
    currentView:          state.getIn(['views', 'currentView']),
    // sideMenu
    sideMenuIsCollapsed:  state.getIn(['sidemenu', 'isCollapsed']),
    // user
    userInfos:            state.getIn(['user', 'userInfos']),
    userInfoFetching:     state.getIn(['user', 'isFetching']),
    userIsConnected:      state.getIn(['user', 'isConnected']),
    // notifications
    notificationMessage:  state.getIn(['notification', 'message']),
    notificationLevel:    state.getIn(['notification', 'level']),
    notificationTime:     state.getIn(['notification', 'actionTime']),
    // addNewInterfaceDataset
    addNewInterfaceDatasetInterfaceId:  state.getIn(['addNewInterfaceDataset', 'interfaceId']),
    addNewInterfaceDatasetOpened:       state.getIn(['addNewInterfaceDataset', 'opened']),
    addNewInterfaceDatasetInterfaceName:state.getIn(['addNewInterfaceDataset', 'interfaceName']),
    // confirmDeleteModal
    confirmDeleteModalOpened: state.getIn(['confirmDeleteModal', 'opened'])
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions : bindActionCreators(
      {
        ...userActions,
        ...viewsActions,
        ...sidemenuActions,
        ...notificationActions,
        openAddDataSetModal:  addNewInterfaceDatasetActions.openModal,
        closeAddDataSetModal: addNewInterfaceDatasetActions.closeModal,
        // editInterface:
        insertNewDataset:      editInterfaceActions.onDatasetInsert,
        // confirmDeleteModal
        openConfirmDeleteModal: confirmDeleteModalActions.openModal,
        cancelConfirmDeleteModal: confirmDeleteModalActions.cancel,
        confirmConfirmDeleteModal: confirmDeleteModalActions.confirm
      },
      dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
