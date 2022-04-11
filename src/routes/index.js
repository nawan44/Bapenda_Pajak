import React from "react";
import {Route, Switch} from "react-router-dom";

import asyncComponent from "util/asyncComponent";

const App = ({match}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route path={`${match.url}dashboard`} component={asyncComponent(() => import('./Dashboard'))}/>
      <Route path={`${match.url}register-device-agent`} component={asyncComponent(() => import('./RegisterDeviceAgent'))}/>
      <Route path={`${match.url}edit-device-agent`} component={asyncComponent(() => import('./EditDeviceAgent'))}/>
      {/* <Route path={`${match.url}status-device-all`} component={asyncComponent(() => import('./StatusDeviceAll'))}/>
      <Route path={`${match.url}status-device-hotel`} component={asyncComponent(() => import('./StatusDeviceHotel'))}/>
      <Route path={`${match.url}status-device-restoran`} component={asyncComponent(() => import('./StatusDeviceRestoran'))}/>
      <Route path={`${match.url}status-device-parkir`} component={asyncComponent(() => import('./StatusDeviceParkir'))}/> */}

      <Route path={`${match.url}device-all`} component={asyncComponent(() => import('./Device/DeviceAll'))}/>
      <Route path={`${match.url}device-hotel`} component={asyncComponent(() => import('./Device/DeviceHotel'))}/>
      <Route path={`${match.url}device-parkir`} component={asyncComponent(() => import('./Device/DeviceParkir'))}/>
      <Route path={`${match.url}device-restoran`} component={asyncComponent(() => import('./Device/DeviceRestoran'))}/>
      <Route path={`${match.url}transaction`} component={asyncComponent(() => import('./Transaction/index'))}/>
      <Route path={`${match.url}my-account`} component={asyncComponent(() => import('./MyAccount'))}/>

      <Route path={`${match.url}not-found`} component={asyncComponent(() => import('./NotFound'))}/>
    </Switch>
  </div>
);

export default App;
