import React, { PropTypes, Component }  from 'react';
import AnimatedView                     from '../../wrappers/AnimatedView.jsx';
import Jumbotron                        from '../../components/jumbotron/Jumbotron.jsx';
import {
  BootstrapTable,
  TableHeaderColumn
}                                       from 'react-bootstrap-table';
import {
  // Grid,
  // Row,
  Col
}                                       from 'react-bootstrap';
import CreateInterfaceButton            from '../../components/createInterfaceButton/CreateInterfaceButton.jsx';
import InterfaceFormat                  from '../../components/interfaceFormat/InterfaceFormat.jsx';
import Immutable                        from 'immutable';
import IsFetching                       from '../../components/isFetching/IsFetching';

class ListInterfaces extends Component {
  static propTypes = {
    // react router:
    params:   PropTypes.object,
    location: PropTypes.object,
    router:   PropTypes.object,

    // views
    currentView: PropTypes.string,

    // interfaces:
    listInterfaces: PropTypes.instanceOf(Immutable.List).isRequired,
    // distinct value for interfaces types ('ELEGIBILITY', 'UHI', etc...):
    isFetchingInterfacesTypes:     PropTypes.bool,
    lastTimeFetchInterfacesTypes:  PropTypes.string,
    interfacesTypes:               PropTypes.instanceOf(Immutable.List),
    // distinct value for interfaces types ('IN', 'OUT', etc...):
    isFetchingInterfacesDirections:     PropTypes.bool,
    lastTimeFetchInterfacesDirections:  PropTypes.string,
    interfacesDirections:               PropTypes.instanceOf(Immutable.List),
    // distinct value for interfaces Format ('TABLE', 'CSV', etc...):
    isFetchingInterfacesFormats:      PropTypes.bool,
    lastTimeFetchInterfacesFormats:   PropTypes.string,
    interfacesFormats:                PropTypes.instanceOf(Immutable.List),

    // redux action creators
    actions: PropTypes.shape({
      // views
      enterListInterfaces: PropTypes.func.isRequired,
      leaveListInterfaces: PropTypes.func.isRequired,
      // interfaces
      fetchConfigInterfacesIfNeeded:          PropTypes.func.isRequired,
      fetchConfigInterfaceDirectionsIfNeeded: PropTypes.func.isRequired,
      fetchConfigInterfaceFormatsIfNeeded:    PropTypes.func.isRequired,
      fetchConfigInterfaceTypesIfNeeded:      PropTypes.func.isRequired
    })
  };

  state = {
    selectedInterfaceId: 0,
    loading: true
  };

  componentDidMount() {
    const  {
      actions: {
        enterListInterfaces,
        fetchConfigInterfacesIfNeeded,
        fetchConfigInterfaceDirectionsIfNeeded,
        fetchConfigInterfaceTypesIfNeeded,
        fetchConfigInterfaceFormatsIfNeeded
      }
    } =  this.props;

    enterListInterfaces();

    Promise.all([
      fetchConfigInterfacesIfNeeded(),
      fetchConfigInterfaceDirectionsIfNeeded(),
      fetchConfigInterfaceTypesIfNeeded(),
      fetchConfigInterfaceFormatsIfNeeded()
    ])
    .then(() => this.setState({ loading: false }))
    .catch(() => this.setState({ loading: false }));
  }

  componentWillUnmount() {
    const { actions: { leaveListInterfaces } } = this.props;
    leaveListInterfaces();
  }

  render() {
    const  {
      listInterfaces,
      interfacesTypes,
      interfacesDirections,
      interfacesFormats
    } = this.props;

    const { loading } = this.state;

    const typeOptions = interfacesTypes
                          .valueSeq()
                          .reduce((prev, next) => ({...prev, [next]: next}), {});

    const directionOptions = interfacesDirections
                          .valueSeq()
                          .reduce((prev, next) => ({...prev, [next]: next}), {});

    const formatOptions = interfacesFormats
                          .valueSeq()
                          .reduce((prev, next) => ({...prev, [next]: next}), {});

    return(
      <AnimatedView>
        <Jumbotron cardLike>
          <h2>
            Interfaces list
          </h2>
          <hr />
          {
            loading &&
            <Col
              lg={12}
              md={12}
              sm={12}
              xs={12}>
              <IsFetching
                text="fetching..."
                showText
                size={32}
              />
            </Col>
          }
          {
            !loading &&
            <div>
              <CreateInterfaceButton
                buttonText="Create a new interface"
                onCLick={this.handlesOnCreateInterfaceClick}
              />

              <BootstrapTable
                data={listInterfaces.toJS()}
                striped={true}
                hover={true}
                pagination
                options={{
                  onRowClick: this.handlesOnRowClick
                }}>

                <TableHeaderColumn
                  dataField="id"
                  isKey={true}
                  dataAlign="center"
                  dataSort={true}
                  filter={{
                    type: 'TextFilter',
                    placeholder: 'filter'
                  }}>
                  id
                </TableHeaderColumn>

                <TableHeaderColumn
                  dataField="name"
                  dataSort={true}
                  filter={{
                    type: 'TextFilter',
                    placeholder: 'filter'
                  }}>
                  name
                </TableHeaderColumn>

                <TableHeaderColumn
                  dataField="type"
                  dataAlign="center"
                  dataSort={true}
                  filter={{
                    type: 'SelectFilter',
                    options: {...typeOptions}
                  }}>
                  type
                </TableHeaderColumn>

                <TableHeaderColumn
                  dataField="format"
                  dataSort={true}
                  dataAlign="center"
                  dataFormat={this.formatFormatColumn}
                  filter={{
                    type: 'SelectFilter',
                    options: {...formatOptions}
                  }}>
                  format
                </TableHeaderColumn>

                <TableHeaderColumn
                  dataField="direction"
                  dataAlign="center"
                  dataSort={true}
                  filter={{
                    type: 'SelectFilter',
                    options: {...directionOptions}
                  }}>
                  direction
                </TableHeaderColumn>

                <TableHeaderColumn
                  dataField="description"
                  dataSort={false}
                  filter={{
                    type: 'TextFilter',
                    placeholder: 'filter'
                  }}>
                  description
                </TableHeaderColumn>
              </BootstrapTable>
            </div>
          }
        </Jumbotron>
      </AnimatedView>
    );
  }

  handlesOnRowClick = ({id}) => {
    const { router } = this.props;
    router.push({
      pathname: `interfaces/interface/${id}`
    });
  }

  formatFormatColumn = (cell, row) => (<InterfaceFormat type={row.format} />)

  formatIdColumn = (cell, row) => (
    <div
      style={{
        position: 'relative',
        margin: 'auto auto'
      }}>
      {row.id}
    </div>
  )

  handlesOnCreateInterfaceClick = event => {
    if (event) {
      event.preventDefault();
    }
    //
  }
}

export default ListInterfaces;
