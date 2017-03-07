'use strict';

import {
  createStore,
  applyMiddleware,
  compose
}                             from 'redux';
import thunkMiddleware        from 'redux-thunk';
import notificationMidleware  from '../middleware/notification';
import fetchMiddleware        from '../middleware/fetchMiddleware';
import reducer                from '../modules/reducers';

const enhancer = compose(
  applyMiddleware(
    thunkMiddleware,
    notificationMidleware,
    fetchMiddleware
  )
);

export default function configureStore(initialState) {
  return createStore(reducer, initialState, enhancer);
}
