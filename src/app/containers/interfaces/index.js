import { bindActionCreators }   from 'redux';
import { connect }              from 'react-redux';
import * as viewsActions        from '../../redux/modules/views';
import { Interfaces }           from '../../views';

const mapStateToProps = (state) => {
  return {
    // views
    currentView: state.getIn(['views', 'currentView'])
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions : bindActionCreators(
      {
        // views
        enterInterfaces: viewsActions.enterInterfaces,
        leaveInterfaces: viewsActions.leaveInterfaces
      },
      dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Interfaces);
