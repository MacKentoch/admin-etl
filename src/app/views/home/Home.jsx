import React, { PropTypes, Component }  from 'react';
import AnimatedView                     from '../../wrappers/AnimatedView.jsx';
import StatsCard                        from '../../components/statsCard/StatsCard.jsx';
import Jumbotron                        from '../../components/jumbotron/Jumbotron.jsx';
import DemoGraph                        from '../../components/demoGraph/DemoGraph.jsx';
import InterfaceFormat                  from '../../components/interfaceFormat/InterfaceFormat.jsx';
import Immutable                        from 'immutable';
import {
  BootstrapTable,
  TableHeaderColumn
}                                       from 'react-bootstrap-table';
import IsFetching                       from '../../components/isFetching/IsFetching';
import {
  // Grid,
  Row,
  Col
}                                       from 'react-bootstrap';

class Home extends Component {
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

    actions: PropTypes.shape({
      // views
      enterHome: PropTypes.func.isRequired,
      leaveHome: PropTypes.func.isRequired,
      // interfaces
      fetchConfigInterfacesIfNeeded:          PropTypes.func.isRequired,
      fetchConfigInterfaceDirectionsIfNeeded: PropTypes.func.isRequired,
      fetchConfigInterfaceFormatsIfNeeded:    PropTypes.func.isRequired,
      fetchConfigInterfaceTypesIfNeeded:      PropTypes.func.isRequired
    })
  }

  state = {
    loadingInterfaceLists: true
  };

  componentDidMount() {
    const  {
      actions: {
        enterHome,
        fetchConfigInterfacesIfNeeded,
        fetchConfigInterfaceTypesIfNeeded,
        fetchConfigInterfaceFormatsIfNeeded
      }
    } =  this.props;
    enterHome();

    Promise.all([
      fetchConfigInterfacesIfNeeded(),
      fetchConfigInterfaceTypesIfNeeded(),
      fetchConfigInterfaceFormatsIfNeeded()
    ])
    .then(() => this.setState({ loadingInterfaceLists: false }))
    .catch(() => this.setState({ loadingInterfaceLists: false }));
  }

  componentWillUnmount() {
    const { actions: { leaveHome } } = this.props;
    leaveHome();
  }

  render() {
    const  {
      listInterfaces,
      interfacesTypes,
      interfacesFormats
    } = this.props;

    const { loadingInterfaceLists } = this.state;

    const typeOptions = interfacesTypes
                          .valueSeq()
                          .reduce((prev, next) => ({...prev, [next]: next}), {});

    const formatOptions = interfacesFormats
                          .valueSeq()
                          .reduce((prev, next) => ({...prev, [next]: next}), {});

    const interfaceIn = listInterfaces
                          .toSeq()
                          .filter(interf => interf.get('direction') === 'IN')
                          .toList();

    const interfaceOut = listInterfaces
                          .toSeq()
                          .filter(interf => interf.get('direction') === 'OUT')
                          .toList();

    return(
      <AnimatedView>
        {/* shortcuts */}
        <Row style={{ marginBottom: '5px' }}>
          <Col
            md={3}>
            <StatsCard
              cardLike
              statValue={'2'}
              statLabel={'interfaces currently running'}
              icon={<i className="fa fa-info" aria-hidden="true"></i>}
              backColor={'blue'}
            />
          </Col>
          <Col
            md={3}>
            <StatsCard
              cardLike
              statValue={'2'}
              statLabel={'interfaces successful done within last 24hrs'}
              icon={<i className="fa fa-info" aria-hidden="true"></i>}
              backColor={'green'}
            />
          </Col>
          <Col
            md={3}>
            <StatsCard
              cardLike
              statValue={'10'}
              statLabel={'interfaces having errors within last 24hrs'}
              icon={<i className="fa fa-bug" aria-hidden="true"></i>}
              backColor={'red'}
            />
          </Col>
          <Col
            md={3}>
            <StatsCard
              cardLike
              statValue={'10'}
              statLabel={'interfaces having warnings within last 24hrs'}
              icon={<i className="fa fa-exclamation-triangle" aria-hidden="true"></i>}
              backColor={'violet'}
            />
          </Col>
        </Row>
        <Row>
          <Col
            lg={4}
            md={12}>
            <Jumbotron cardLike>
              <h2>
                Daily stats
              </h2>
              <hr />
              <DemoGraph
                labels={ [
                  '00h00 - 06:59',
                  '07:00 - 08:59',
                  '09:00 - 11:59',
                  '12:00 - 13:59',
                  '14:00 - 17:59',
                  '18:00 - 19:59',
                  '20:00 - 23:59'
                ] }
                datasets={
                [
                  {
                    label: 'successful',
                    fillColor: 'rgba(220,220,220,0.2)',
                    strokeColor: 'rgba(220,220,220,1)',
                    pointColor: 'rgba(220,220,220,1)',
                    pointStrokeColor: '#fff',
                    pointHighlightFill: '#fff',
                    pointHighlightStroke: 'rgba(220,220,220,1)',
                    data: [65, 59, 80, 81, 56, 55, 40]
                  },
                  {
                    label: 'failed',
                    fillColor: 'rgba(151,187,205,0.2)',
                    strokeColor: 'rgba(15,187,205,1)',
                    pointColor: 'rgba(15,187,205,1)',
                    pointStrokeColor: '#fff000',
                    pointHighlightFill: '#fff000',
                    pointHighlightStroke: 'rgba(151,187,205,1)',
                    data: [28, 48, 40, 19, 86, 27, 90]
                  }
                ]}
              />
            </Jumbotron>
          </Col>
          <Col
            lg={4}
            md={12}>
            <Jumbotron cardLike>
                <h2>
                  Weekly stats
                </h2>
                <hr />
                <DemoGraph
                  labels={ [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday'
                  ] }
                  datasets={
                  [
                    {
                      label: 'successful',
                      fillColor: 'rgba(220,220,220,0.2)',
                      strokeColor: 'rgba(220,220,220,1)',
                      pointColor: 'rgba(220,220,220,1)',
                      pointStrokeColor: '#fff',
                      pointHighlightFill: '#fff',
                      pointHighlightStroke: 'rgba(220,220,220,1)',
                      data: [65, 59, 80, 81, 56, 55, 40]
                    },
                    {
                      label: 'failed',
                      fillColor: 'rgba(151,187,205,0.2)',
                      strokeColor: 'rgba(15,187,205,1)',
                      pointColor: 'rgba(15,187,205,1)',
                      pointStrokeColor: '#fff000',
                      pointHighlightFill: '#fff000',
                      pointHighlightStroke: 'rgba(151,187,205,1)',
                      data: [28, 48, 40, 19, 86, 27, 90]
                    }
                  ]}
                />
            </Jumbotron>
          </Col>
          <Col
            lg={4}
            md={12}>
            <Jumbotron cardLike>
                <h2>
                  Yearly stats
                </h2>
                <hr />
                <DemoGraph
                  labels={ ['January', 'February', 'March', 'April', 'May', 'June', 'July'] }
                  datasets={
                  [
                    {
                      label: 'My First dataset',
                      fillColor: 'rgba(220,220,220,0.2)',
                      strokeColor: 'rgba(220,220,220,1)',
                      pointColor: 'rgba(220,220,220,1)',
                      pointStrokeColor: '#fff',
                      pointHighlightFill: '#fff',
                      pointHighlightStroke: 'rgba(220,220,220,1)',
                      data: [65, 59, 80, 81, 56, 55, 40]
                    },
                    {
                      label: 'My Second dataset',
                      fillColor: 'rgba(151,187,205,0.2)',
                      strokeColor: 'rgba(151,187,205,1)',
                      pointColor: 'rgba(151,187,205,1)',
                      pointStrokeColor: '#fff',
                      pointHighlightFill: '#fff',
                      pointHighlightStroke: 'rgba(151,187,205,1)',
                      data: [28, 48, 40, 19, 86, 27, 90]
                    }
                  ]}
                />
            </Jumbotron>
          </Col>
        </Row>
        {/* activité groupe et boîtes mails */}
        <Row>
          <Col
            md={6}>
            <Jumbotron cardLike>
              <h2>
                MSH Interfaces IN:
              </h2>
              <hr />
              {
                loadingInterfaceLists &&
                <Col
                  lg={10}
                  lgOffset={1}
                  md={10}
                  mdOffset={1}
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
                !loadingInterfaceLists &&
                <BootstrapTable
                  data={interfaceIn.toJS()}
                  striped={true}
                  hover={true}
                  pagination
                  options={{onRowClick: this.handlesOnRowClick }}>

                  <TableHeaderColumn
                    isKey={true}
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
                    dataField="description"
                    dataSort={false}
                    filter={{
                      type: 'TextFilter',
                      placeholder: 'filter'
                    }}>
                    description
                  </TableHeaderColumn>
                </BootstrapTable>
              }
            </Jumbotron>
          </Col>
          <Col
            md={6}>
            <Jumbotron cardLike>
              <h2>
                MSH Interfaces OUT:
              </h2>
              <hr />
              {
                loadingInterfaceLists &&
                <Col
                  lg={10}
                  lgOffset={1}
                  md={10}
                  mdOffset={1}
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
                !loadingInterfaceLists &&
                <BootstrapTable
                  data={interfaceOut.toJS()}
                  striped={true}
                  hover={true}
                  pagination
                  options={{onRowClick: this.handlesOnRowClick }}>

                  <TableHeaderColumn
                    isKey={true}
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
                    dataField="description"
                    dataSort={false}
                    filter={{
                      type: 'TextFilter',
                      placeholder: 'filter'
                    }}>
                    description
                  </TableHeaderColumn>
                </BootstrapTable>
              }
            </Jumbotron>
          </Col>
        </Row>
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

  handlesInterfaceInRowSelection = selectedInterface => {
    const { id } = selectedInterface;
    const { router } = this.props;
    router.push('interfaces/interface', {params: {interfaceId: id}});
  }

  onFilterInterfacesIn = (filterValue) => {
    const { interfacesIn } = this.state;
    this.setState({ interfacesInFiltered: this.filterByNameAndDescription(interfacesIn, filterValue) });
  }

  onFilterInterfacesOut = (filterValue) => {
    const { interfacesOut } = this.state;
    this.setState({ interfacesOutFiltered: this.filterByNameAndDescription(interfacesOut, filterValue) });
  }

  filterByNameAndDescription(list, filterValue) {
    return list.filter(
      item => {
        // const containsRgx = new RegExp(filterValue, 'gi');
        // return containsRgx.test(item.name) || containsRgx.test(item.name);
        const filterValueLower = filterValue.toLowerCase();
        const interfaceNameLower = item.name.toLowerCase();
        const interfaceDescLower = item.description.toLowerCase();

        return  interfaceNameLower.includes(filterValueLower)
            ||  interfaceDescLower.includes(filterValueLower);
      }
    );
  }
}

export default Home;
