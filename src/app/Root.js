/* eslint-disable no-process-env */
import React, {
  PropTypes,
  Component
}                               from 'react';
import {
  Router,
  hashHistory,
  browserHistory 
}                               from 'react-router';
import { Provider }             from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore           from './redux/store/configureStore';

let history;
if (process.env.NODE_ENV === 'production') {
  // with back end server app
  history = browserHistory;
} else {
  // no back-end server app:
  history = hashHistory;
}

const store         = configureStore();
const syncedHistory = syncHistoryWithStore(
  history,
  store,
  {
    selectLocationState(state) {
      return state.get('routing').toJS();
    }
  }
);

class Root extends Component {
  render() {
    const { routes } = this.props;
    return (
      <Provider store={store}>
        <div>
          <Router history={syncedHistory}>
            {routes()}
          </Router>
          {/* { process.env.NODE_ENV !== 'production' ? <DevTools /> : null } */}
        </div>
      </Provider>
    );
  }
}

Root.propTypes = {
  routes: PropTypes.any
};

export default Root;
