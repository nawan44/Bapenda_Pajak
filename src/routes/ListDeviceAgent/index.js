import React, { useState, useEffect } from "react";
import { Table, Input, InputNumber, Popconfirm, Form, Typography, Button, Modal } from "antd";
import Widget from "components/Widget/index";
import IntlMessages from "util/IntlMessages";
import jwtDecode from "jwt-decode";
import "../../assets/styles/forRegistrasi.css"
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined, OrderedListOutlined, UserOutlined, FormOutlined,
} from '@ant-design/icons';
// import EditDeviceAgent from "../EditDeviceAgent"
import { useHistory } from "react-router-dom";
import ListDataDevice from "./listDataDevice";

import EditDeviceAgent from "../EditDeviceAgent";

const ListDeviceAgent = () => {
  const [selectedRecord, setSelectedRecord] = useState()
  const [listData, setListData] = useState({
    aksiList: "",
    itemList: null,
  });

  if (listData.aksiList === "editData") {
    return (<EditDeviceAgent selectedRecord={selectedRecord} setSelectedRecord={setSelectedRecord} listData={listData} setListData={setListData} aksiList={listData.aksiList} itemList={listData.itemList} />
    )
  } else {
     console.log("")
  }
  return (
    <>
      <ListDataDevice listData={listData} setListData={setListData} aksiList={listData.aksiList} itemList={listData.itemList} />
    </>
  );
};

export default ListDeviceAgent;
