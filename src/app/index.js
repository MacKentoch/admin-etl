import React                from 'react';
import ReactDOM             from 'react-dom';
import { AppContainer }     from 'react-hot-loader';
import Root                 from './Root';
import Routes               from './routes/Route';

import 'babel-polyfill';
import 'animate.css';
import 'jquery';
import 'whatwg-fetch';
import 'font-awesome/css/font-awesome.min.css';
import 'ionicons/dist/css/ionicons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
//
import './vendors/css/morris/morris.css';
import './vendors/css/jvectormap/jquery-jvectormap-1.2.2.css';
import './vendors/css/datepicker/datepicker3.css';
import './vendors/css/director-style.css';
import './vendors/js/jquery-ui-1.10.3.min.js';

import './vendors/js/plugins/fullcalendar/fullcalendar.js';
// rc-switch
import 'rc-switch/assets/index.css';
// datepicker
import 'react-datepicker/dist/react-datepicker.css';
// react-taggole
import 'react-toggle/style.css';
// react bootstrap table
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';         // with toastr
// app css
import './style/index.style.scss';

const ELEMENT_TO_BOOTSTRAP  = 'root';
const BootstrapedElement    = document.getElementById(ELEMENT_TO_BOOTSTRAP);

const renderApp = appRoutes => {
  ReactDOM.render(
    <AppContainer>
      <Root routes={appRoutes} />
    </AppContainer>,
    BootstrapedElement
  );
};

renderApp(Routes);

if (module.hot) {
  module.hot.accept(
    './routes/Route',
    () => {
      const newRoutes = require('./routes/Route').default;
      renderApp(newRoutes);
    }
  );
}
