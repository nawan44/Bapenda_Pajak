import React, { useState, useEffect } from "react";
import { Table } from "antd";
import Widget from "components/Widget/index";
import IntlMessages from "util/IntlMessages";
import jwtDecode from "jwt-decode";

const columns = [
  {
    title: 'Device ID',
    dataIndex: 'device_id',
  },
  {
    title: 'Owner',
    dataIndex: 'owner',
  },
  {
    title: 'Email	',
    dataIndex: 'email',
  },

  {
    title: 'Nama Usaha	',
    dataIndex: 'nama_usaha',
  },
  {
    title: 'Type Pajak	',
    dataIndex: 'type_pajak',
  },
];
const ListDeviceAgent = () => {
  const [listDevice, setListDevice] = useState()
  const [loading, setloading] = useState(true);

  console.log("listDevice",listDevice)

  useEffect(() => {
    getListDevice();
  }, []);
  const data = listDevice && listDevice.map(row => ({ 
    device_id : row[0].stringValue,
    owner: row[1].stringValue, 
    email: row[3].stringValue,
    nama_usaha: row[4].stringValue, 
    type_pajak: row[6].stringValue }));
  const getListDevice = async (dataLatest) => {
    const decoded = jwtDecode(localStorage.token)
    const apiKey =decoded["api-key"]
    const token = localStorage.getItem('token')
    const headers = {
        'x-api-key': `${apiKey}`,
      'content-type': 'application/json',
  
      'Authorization': `Bearer ${token}`
    }
    const response = await fetch(
       "https://api.raspi-geek.com/v1/merchants",
       
       { method: "GET",headers }
    );
    const ajson = await response.json();
    setListDevice(ajson.Records)
  }
  return (
    <Widget styleName="gx-order-history"
    title={
      <h2 className="h2 gx-text-capitalize gx-mb-0">
Daftar Device / Agent</h2>
    }     
    >
    <div className="gx-table-responsive">
      <Table className="gx-table-no-bordered" columns={columns} dataSource={data} pagination={false} bordered={false}
        size="small" />
    </div>
  </Widget>
  );
};

export default ListDeviceAgent;
