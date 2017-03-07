/* eslint no-process-env:0 */
import React from 'react';
import {
  Route,
  IndexRoute
 }                              from 'react-router';
import {
  App,
  InterfacesConnected,
  EditInterfaceConnected,
  ListInterfacesConnected,
  HomeConnected
}                               from '../containers';
import PageNotFound             from '../views/pageNotFound/PageNotFound.jsx';

const Routes = () => {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={HomeConnected} onEnter={scrollTop} />
      <Route path="interfaces" component={InterfacesConnected}>
        <IndexRoute component={ListInterfacesConnected} onEnter={scrollTop} />
        {/* <Route path="interface" component={ListInterfacesConnected} onEnter={scrollTop} /> */}
        <Route path="interface/:interfaceId" component={EditInterfaceConnected} onEnter={scrollTop} />
        {/* <Route path="*" component={ListInterfacesConnected} onEnter={scrollTop} /> */}
      </Route>
      <Route path="*" component={PageNotFound} />
    </Route>
  );
};

function scrollTop() {
  window.scrollTo(0, 0);
}

export default Routes;
