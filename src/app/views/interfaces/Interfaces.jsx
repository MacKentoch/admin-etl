import React, { PropTypes, PureComponent }  from 'react';
import AnimatedView                     from '../../wrappers/AnimatedView.jsx';
import Breadcrumb                       from '../../components/breadcrumb/Breadcrumb.jsx';


class Interfaces extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,

    // react router:
    params:   PropTypes.object,
    location: PropTypes.object,

    // views
    currentView: PropTypes.string,

    // redux action creators
    actions: PropTypes.shape({
      // views:
      enterInterfaces: PropTypes.func.isRequired,
      leaveInterfaces: PropTypes.func.isRequired
    })
  };
  
  componentDidMount() {
    const  {
      actions: {
        enterInterfaces
      }
    } = this.props;

    enterInterfaces();
  }

  componentWillUnmount() {
    const { actions: { leaveInterfaces } } = this.props;
    leaveInterfaces();
  }

  render() {
    const  { location: { pathname } } =  this.props;
    const { children } = this.props;

    return(
      <AnimatedView>
        <Breadcrumb
          style={{marginLeft: '15px ', marginRight: '15px'}}
          path={[...pathname.split('/').slice(1)]}
        />
        <div>
          { children }
        </div>
      </AnimatedView>
    );
  }
}

export default Interfaces;
