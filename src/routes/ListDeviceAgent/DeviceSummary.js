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

import EditDeviceAgent from "../EditDeviceAgent";
import SectionDevice from "./SectionDevice";
import Productivity from "../../components/Widgets/Productivity";

const DeviceSummary = ({ selectedRecord, setSelectedRecord, listData, setListData, aksiList, itemList }) => {
  
    
  return (
    <>
        <Productivity  selectedRecord={selectedRecord} setSelectedRecord={setSelectedRecord} listData={listData} setListData={setListData} aksiList={listData.aksiList} itemList={listData.itemList} />
    </>
  );
};

export default DeviceSummary;
