import React, { PropTypes, Component }  from 'react';
import {
  Nav,
  NavItem
}                                       from 'react-bootstrap';
import AnimatedView                     from '../../wrappers/AnimatedView.jsx';
import Jumbotron                        from '../../components/jumbotron/Jumbotron.jsx';
import Immutable                        from 'immutable';
import EditConfigInterface              from '../../components/editConfigInterface/EditConfigInterface.jsx';
import EditConfigInterfaceDatasets      from '../../components/editConfigInterfaceDatasets/EditConfigInterfaceDatasets.jsx';


class EditInterface extends Component {
  static propTypes = {
    // react router:
    params:   PropTypes.object,
    location: PropTypes.object,
    router:   PropTypes.object,
    // views:
    currentView: PropTypes.string,

    // editInterface (general):
    isFetching:     PropTypes.bool.isRequired,
    lastFetchTime:  PropTypes.string.isRequired,
    interfaceProps: PropTypes.instanceOf(Immutable.Map).isRequired,

    interfacesTypes: PropTypes.instanceOf(Immutable.List).isRequired,
    isFetchingInterfacesTypes: PropTypes.bool.isRequired,
    lastTimeFetchInterfacesTypes: PropTypes.string.isRequired,

    interfacesDirections:              PropTypes.instanceOf(Immutable.List).isRequired,
    isFetchingInterfacesDirections:    PropTypes.bool.isRequired,
    lastTimeFetchInterfacesDirections: PropTypes.string.isRequired,

    interfacesFormats:              PropTypes.instanceOf(Immutable.List).isRequired,
    isFetchingInterfacesFormats:    PropTypes.bool.isRequired,
    lastTimeFetchInterfacesFormats: PropTypes.string.isRequired,

    columnModFunctions:              PropTypes.instanceOf(Immutable.List).isRequired,
    isFetchingColumnModFunctions:    PropTypes.bool.isRequired,
    lastTimeFetchColumnModFunctions: PropTypes.string.isRequired,

    // editInterface (all datasets):
    interfaceDatasets:      PropTypes.instanceOf(Immutable.List).isRequired,
    isFetchingDatasets:     PropTypes.bool.isRequired,
    lastFetchTimeDatasets:  PropTypes.string.isRequired,
    // editInterface (columns description):
    interfaceDatasetId:           PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    isFetchingDatasetColDesc:     PropTypes.bool.isRequired,
    lastFetchTimeDatasetColDesc:  PropTypes.string.isRequired,
    interfaceDatasetColDesc:      PropTypes.instanceOf(Immutable.List).isRequired,
    // editInterface (column modifiers):
    isFetchingDatasetColMod:     PropTypes.bool.isRequired,
    lastFetchTimeDatasetColMod:  PropTypes.string.isRequired,
    interfaceDatasetColMod:      PropTypes.instanceOf(Immutable.List).isRequired,
    // action creator
    actions: PropTypes.shape({
      // views:
      enterEditInterface: PropTypes.func.isRequired,
      leaveEditInterface: PropTypes.func.isRequired,
      // notifications:
      addNotificationMessage: PropTypes.func.isRequired,
      // editInterface (general):
      fetchConfigInterfaceEdit: PropTypes.func.isRequired,
      fetchInterfaceTypes:          PropTypes.func.isRequired,
      fetchInterfaceDirections:     PropTypes.func.isRequired,
      fetchInterfaceFormats:        PropTypes.func.isRequired,
      fetchColumnModifiersFct:      PropTypes.func.isRequired,
      // editInterface (all datasets):
      fetchConfigInterfaceDatasets: PropTypes.func.isRequired,
      onDatasetUpdate:              PropTypes.func.isRequired,
      onDatasetInsert:              PropTypes.func.isRequired,
      onDatasetDelete:              PropTypes.func.isRequired,
      onDatasetReset:               PropTypes.func.isRequired,
      // editInterface (all columns description):
      fetchConfigInterfaceDatasetColumnDescription: PropTypes.func.isRequired,
      onDatasetColDescUpdate:               PropTypes.func.isRequired,
      onDatasetColDescInsert:               PropTypes.func.isRequired,
      onDatasetColDescDelete:               PropTypes.func.isRequired,
      onDatasetColDescReset:                PropTypes.func.isRequired,
      // editInterface (all column modifiers):
      fetchConfigInterfaceDatasetColumnModifiers: PropTypes.func.isRequired,
      onDatasetColModUpdate:               PropTypes.func.isRequired,
      onDatasetColModInsert:               PropTypes.func.isRequired,
      onDatasetColModDelete:               PropTypes.func.isRequired,
      onDatasetColModReset:                PropTypes.func.isRequired,
      // add new interface dataset
      openAddDataSetModal:          PropTypes.func.isRequired,
      // confirmDeleteModal:
      openConfirmDeleteModal:       PropTypes.func.isRequired
    })
  };

  state = {
    currentTabKey: '1'
  };

  componentDidMount() {
    const  {
      params: { interfaceId },
      // location: { query: { interfaceName } },
      actions: { enterEditInterface }
    } =  this.props;
    enterEditInterface(interfaceId);
  }

  componentWillUnmount() {
    const { actions: { leaveEditInterface } } = this.props;
    leaveEditInterface();
  }

  render() {
    const {
      params: { interfaceId },
      actions: {
        addNotificationMessage,
        fetchConfigInterfaceEdit,
        fetchInterfaceTypes,
        fetchInterfaceDirections,
        fetchInterfaceFormats,
        fetchConfigInterfaceDatasets,
        fetchColumnModifiersFct,
        onDatasetUpdate,
        onDatasetInsert,
        onDatasetDelete,
        onDatasetReset,
        openConfirmDeleteModal,
        fetchConfigInterfaceDatasetColumnDescription,
        onDatasetColDescUpdate,
        onDatasetColDescInsert,
        onDatasetColDescDelete,
        onDatasetColDescReset,
        fetchConfigInterfaceDatasetColumnModifiers,
        onDatasetColModUpdate,
        onDatasetColModInsert,
        onDatasetColModDelete,
        onDatasetColModReset
      },
      isFetching,
      lastFetchTime,
      interfaceProps,
      interfacesTypes,
      isFetchingInterfacesTypes,
      lastTimeFetchInterfacesTypes,
      interfacesDirections,
      isFetchingInterfacesDirections,
      lastTimeFetchInterfacesDirections,
      interfacesFormats,
      isFetchingInterfacesFormats,
      lastTimeFetchInterfacesFormats,
      interfaceDatasets,
      isFetchingDatasets,
      lastFetchTimeDatasets,
      interfaceDatasetId,
      isFetchingDatasetColDesc,
      lastFetchTimeDatasetColDesc,
      interfaceDatasetColDesc,
      isFetchingDatasetColMod,
      lastFetchTimeDatasetColMod,
      interfaceDatasetColMod,
      columnModFunctions,
      isFetchingColumnModFunctions,
      lastTimeFetchColumnModFunctions
    } = this.props;

    const { currentTabKey } = this.state;

    return(
      <AnimatedView>
        <Jumbotron cardLike>
          <div className="tabbable-panel">
            <div className="tabbable-line">
              <Nav
                 bsStyle="tabs"
                 activeKey={currentTabKey}
                 onSelect={this.handleTabSelect}>
                <NavItem
                  eventKey="1"
                  disabled={false}>
                  INTERFACE
                </NavItem>
                <NavItem
                  eventKey="2"
                  disabled={false}>
                  DATASETS
                </NavItem>
              </Nav>
            </div>
            <div className="tab-content">
              {
                currentTabKey === '1' &&
                <EditConfigInterface
                  interfaceId={interfaceId}
                  fetchConfigInterfaceEdit={fetchConfigInterfaceEdit}
                  fetchInterfaceTypes={fetchInterfaceTypes}
                  isFetching={isFetching}
                  lastFetchTime={lastFetchTime}
                  interfaceProps={interfaceProps}
                  interfacesTypes={interfacesTypes}
                  isFetchingInterfacesTypes={isFetchingInterfacesTypes}
                  lastTimeFetchInterfacesTypes={lastTimeFetchInterfacesTypes}
                  interfacesDirections={interfacesDirections}
                  isFetchingInterfacesDirections={isFetchingInterfacesDirections}
                  lastTimeFetchInterfacesDirections={lastTimeFetchInterfacesDirections}
                  interfacesFormats={interfacesFormats}
                  isFetchingInterfacesFormats={isFetchingInterfacesFormats}
                  lastTimeFetchInterfacesFormats={lastTimeFetchInterfacesFormats}
                  fetchInterfaceDirections={fetchInterfaceDirections}
                  fetchInterfaceFormats={fetchInterfaceFormats}
                />
              }
              {
                currentTabKey === '2' &&
                <EditConfigInterfaceDatasets
                  addNotificationMessage={addNotificationMessage}

                  fetchColumnModifiersFct={fetchColumnModifiersFct}
                  columnModFunctions={columnModFunctions}
                  isFetchingColumnModFunctions={isFetchingColumnModFunctions}
                  lastTimeFetchColumnModFunctions={lastTimeFetchColumnModFunctions}

                  interfaceId={interfaceId}
                  interfaceName={interfaceProps.get('name')}

                  isFetching={isFetching}
                  lastFetchTime={lastFetchTime}
                  interfaceProps={interfaceProps}

                  interfaceDatasets={interfaceDatasets}
                  isFetchingDatasets={isFetchingDatasets}
                  lastFetchTimeDatasets={lastFetchTimeDatasets}

                  fetchConfigInterfaceDatasets={fetchConfigInterfaceDatasets}
                  onDatasetUpdate={onDatasetUpdate}
                  onDatasetInsert={onDatasetInsert}
                  onDatasetDelete={onDatasetDelete}
                  onDatasetReset={onDatasetReset}

                  interfaceDatasetId={interfaceDatasetId}
                  isFetchingDatasetColDesc={isFetchingDatasetColDesc}
                  lastFetchTimeDatasetColDesc={lastFetchTimeDatasetColDesc}
                  interfaceDatasetColDesc={interfaceDatasetColDesc}
                  fetchConfigInterfaceDatasetColumnDescription={fetchConfigInterfaceDatasetColumnDescription}
                  onDatasetColDescUpdate={onDatasetColDescUpdate}
                  onDatasetColDescInsert={onDatasetColDescInsert}
                  onDatasetColDescDelete={onDatasetColDescDelete}
                  onDatasetColDescReset={onDatasetColDescReset}

                  isFetchingDatasetColMod={isFetchingDatasetColMod}
                  lastFetchTimeDatasetColMod={lastFetchTimeDatasetColMod}
                  interfaceDatasetColMod={interfaceDatasetColMod}
                  fetchConfigInterfaceDatasetColumnModifiers={fetchConfigInterfaceDatasetColumnModifiers}
                  onDatasetColModUpdate={onDatasetColModUpdate}
                  onDatasetColModInsert={onDatasetColModInsert}
                  onDatasetColModDelete={onDatasetColModDelete}
                  onDatasetColModReset={onDatasetColModReset}

                  openConfirmDeleteModal={openConfirmDeleteModal}
                />
              }
            </div>
          </div>
        </Jumbotron>
      </AnimatedView>
    );
  }

  handleTabSelect = (eventKey) => {
    event.preventDefault();
    const { currentTabKey } = this.state;

    if (currentTabKey !== eventKey) {
      this.setState({ currentTabKey: eventKey });
    }
  }
}

export default EditInterface;
