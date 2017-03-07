import { combineReducers }      from 'redux-immutable';
import routerReducer from './immutableRoute';
import { reducer as form }      from 'redux-form/immutable';

import views from './views';
import user from './user';
import notification from './notification';
import sidemenu from './sidemenu';
import interfaces from './interfaces';
import editInterface from './editInterface';
import addNewInterfaceDataset from './addNewInterfaceDataset';
import confirmDeleteModal from './confirmDeleteModal';

export const reducers = {
  views,
  user,
  notification,
  sidemenu,
  interfaces,
  editInterface,
  addNewInterfaceDataset,
  confirmDeleteModal
};

export default combineReducers({
  ...reducers,
  form,
  routing: routerReducer
});
