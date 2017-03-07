import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import * as viewsActions      from '../../redux/modules/views';
import * as interfacesActions from '../../redux/modules/interfaces';
import { Home }               from '../../views';

const mapStateToProps = (state) => {
  return {
    // views
    currentView: state.getIn(['views', 'currentView']),
    // interfaces
    listInterfaces: state.getIn(['interfaces', 'listInterfaces']),
    // distinct value for interfaces types ('ELEGIBILITY', 'UHI', etc...):
    isFetchingInterfacesTypes:    false,
    lastTimeFetchInterfacesTypes:  '',
    interfacesTypes:              state.getIn(['interfaces', 'interfacesTypes']),
    // distinct value for interfaces types ('IN', 'OUT', etc...):
    isFetchingInterfacesDirections:    false,
    lastTimeFetchInterfacesDirections:  '',
    interfacesDirections:               state.getIn(['interfaces', 'interfacesDirections']),
    // distinct value for interfaces Format ('TABLE', 'CSV', etc...):
    isFetchingInterfacesFormats:    false,
    lastTimeFetchInterfacesFormats:  '',
    interfacesFormats:               state.getIn(['interfaces', 'interfacesFormats'])
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions : bindActionCreators(
      {
        // views
        enterHome: viewsActions.enterHome,
        leaveHome: viewsActions.leaveHome,
        // interfaces
        fetchConfigInterfacesIfNeeded:          interfacesActions.fetchConfigInterfacesIfNeeded,
        fetchConfigInterfaceDirectionsIfNeeded: interfacesActions.fetchConfigInterfaceDirectionsIfNeeded,
        fetchConfigInterfaceFormatsIfNeeded:    interfacesActions.fetchConfigInterfaceFormatsIfNeeded,
        fetchConfigInterfaceTypesIfNeeded:      interfacesActions.fetchConfigInterfaceTypesIfNeeded
      },
      dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
