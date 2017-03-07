import React, { PureComponent }  from 'react';
import AnimatedView from '../../wrappers/AnimatedView.jsx';


class PageNotFound extends PureComponent {
  state = {
    animated: true
  };

  render() {
    return(
      <AnimatedView>
        <div
          className="row"
          style={{marginBottom: '5px'}}>
          <div className="col-md-12">
            <h2>
              Page not found...
            </h2>
          </div>
        </div>
      </AnimatedView>
    );
  }
}

PageNotFound.propTypes = {
  // actions: PropTypes.shape({
  //   // enterRecherche: PropTypes.func,
  //   // leaveRecherche: PropTypes.func
  // })
};

export default PageNotFound;
