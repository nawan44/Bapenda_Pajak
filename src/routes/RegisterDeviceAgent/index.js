import React from "react";
import {  Card } from 'antd';
import IntlMessages from "util/IntlMessages";
import { MyStepForm } from "./myStepForm";


const RegisterDeviceAgent = () => {

  return (
    <div>
      <h2 className="title gx-mb-4"><IntlMessages id="sidebar.registerDeviceAgent" /></h2>
      <Card className="gx-card" >
        <MyStepForm />
      </Card>

    </div>
  );
};

export default RegisterDeviceAgent;
