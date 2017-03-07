'use strict';

import {
  createStore,
  compose,
  applyMiddleware
}                               from 'redux';
import createLogger             from 'redux-logger';
import thunkMiddleware          from 'redux-thunk';
import reducer                  from '../modules/reducers';
import notificationMidleware    from '../middleware/notification';
import fetchMiddleware          from '../middleware/fetchMiddleware';

const loggerMiddleware = createLogger({
  level:            'info',
  collapsed:        true,
  stateTransformer: state => state.toJS() // add support for immutable
});

// createStore : enhancer
// NOTE: if redux devtools extension is not installed, we just keep using Redux compose
const composeEnhancers =  typeof window === 'object' &&  // for universal ("isomorphic") apps
                          window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
                          ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
                            // see: https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md
                          })
                          : compose;

const enhancer = composeEnhancers(
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
    notificationMidleware,
    fetchMiddleware
  )
);

export default function configureStore(initialState) {
  const store = createStore(
    reducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../modules/reducers', () => {
      const hotReloadedReducer = require('../modules/reducers').default;
      store.replaceReducer(hotReloadedReducer);
    });
  }
  return store;
}
