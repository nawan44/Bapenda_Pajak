import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const App = ({match}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route path={`${match.url}dashboard`} component={asyncComponent(() => import('./Dashboard'))}/>
      <Route path={`${match.url}register-device-agent`} component={asyncComponent(() => import('./RegisterDeviceAgent'))}/>
      <Route path={`${match.url}edit-device-agent`} component={asyncComponent(() => import('./EditDeviceAgent'))}/>
      <Route path={`${match.url}status-device-all`} component={asyncComponent(() => import('./StatusDeviceAll'))}/>
      <Route path={`${match.url}status-device-hotel`} component={asyncComponent(() => import('./StatusDeviceHotel'))}/>
      <Route path={`${match.url}status-device-restoran`} component={asyncComponent(() => import('./StatusDeviceRestoran'))}/>
      <Route path={`${match.url}status-device-parkir`} component={asyncComponent(() => import('./StatusDeviceParkir'))}/>

      <Route path={`${match.url}device-all`} component={asyncComponent(() => import('./ListDeviceAgent'))}/>
      <Route path={`${match.url}not-found`} component={asyncComponent(() => import('./NotFound'))}/>
    </Switch>
  </div>
);

export default App;
