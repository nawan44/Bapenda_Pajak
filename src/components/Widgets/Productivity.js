import React, { useState, useEffect } from "react";
import { Avatar, Typography } from "antd";
import { ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, } from 'recharts';
import { CloseCircleFilled } from '@ant-design/icons';
import { Row, Col, Input, Button } from "antd";
import jwtDecode from "jwt-decode";

import Widget from "components/Widget/index";
import { useHistory } from "react-router-dom";
import * as moment from 'moment';
import 'moment/locale/id'

// const data = [
//   { name: 'Page A', price: 200 },
//   { name: 'Page B', price: 800 },
//   { name: 'Page C', price: 600 },
//   { name: 'Page D', price: 2200 },
//   { name: 'Page D', price: 1000 },
//   { name: 'Page H', price: 2960 },
//   { name: 'Page K', price: 1960 },
// ];

const Productivity = ({ selectedRecord, setSelectedRecord, listData, setListData, aksiList, itemList }) => {
  const history = useHistory();
  const [detailMerchant, setDetailMerchant] = useState()
  const [dataMerchant, setDataMerchant] = useState()

  const nominalPendapatan1 = detailMerchant && detailMerchant.map(row => Number(row[8].stringValue));
  const nominalPendapatan2 = detailMerchant && detailMerchant.map(row => Number(row[10].stringValue));
  const nominalPendapatan3 = detailMerchant && detailMerchant.map(row => Number(row[12].stringValue));
  const nominalPendapatan4 = detailMerchant && detailMerchant.map(row => Number(row[14].stringValue));
  const nominalPendapatan5 = detailMerchant && detailMerchant.map(row => Number(row[16].stringValue));
  const nominalPendapatan6 = detailMerchant && detailMerchant.map(row => Number(row[18].stringValue));
  const nominalPendapatan7 = detailMerchant && detailMerchant.map(row => Number(row[20].stringValue));

  const transaksiPendapatan1 = detailMerchant && detailMerchant.map(row => row[9].longValue);
  const transaksiPendapatan2 = detailMerchant && detailMerchant.map(row => row[11].longValue);
  const transaksiPendapatan3 = detailMerchant && detailMerchant.map(row => row[13].longValue);
  const transaksiPendapatan4 = detailMerchant && detailMerchant.map(row => row[15].longValue);
  const transaksiPendapatan5 = detailMerchant && detailMerchant.map(row => row[17].longValue);
  const transaksiPendapatan6 = detailMerchant && detailMerchant.map(row => row[19].longValue);
  const transaksiPendapatan7 = detailMerchant && detailMerchant.map(row => row[21].longValue);
 
  const dataPendapatan = [
    {
      tanggal:moment().subtract(6, 'd').format('DD-MM-YYYY'),
      pendapatan:  Number(nominalPendapatan7),
    },
    {
      tanggal: moment().subtract(5, 'd').format('DD-MM-YYYY'),
      pendapatan:  Number(nominalPendapatan6),
    },
    {
      tanggal: moment().subtract(4, 'd').format('DD-MM-YYYY'),
      pendapatan:  Number(nominalPendapatan5),
    },
    {
      tanggal: moment().subtract(3, 'd').format('DD-MM-YYYY'),
      pendapatan:  Number(nominalPendapatan4),
    },
    {
      tanggal: moment().subtract(2, 'd').format('DD-MM-YYYY'),
      pendapatan: Number( nominalPendapatan3),
    },
    {
      tanggal: moment().subtract(1, 'd').format('DD-MM-YYYY'),
      pendapatan:  Number(nominalPendapatan2),
    },

    {
      tanggal: moment().format('DD-MM-YYYY'),
      pendapatan: Number(nominalPendapatan1),

    },
  ];

  const dataTransaksi = [
    {
      tanggal:moment().subtract(6, 'd').format('DD-MM-YYYY'),
      transaksi:  Number(transaksiPendapatan7),
    },
    {
      tanggal: moment().subtract(5, 'd').format('DD-MM-YYYY'),
      transaksi:  Number(transaksiPendapatan6),
    },
    {
      tanggal: moment().subtract(4, 'd').format('DD-MM-YYYY'),
      transaksi:  Number(transaksiPendapatan5),
    },
    {
      tanggal: moment().subtract(3, 'd').format('DD-MM-YYYY'),
      transaksi:  Number(transaksiPendapatan4),
    },
    {
      tanggal: moment().subtract(2, 'd').format('DD-MM-YYYY'),
      transaksi: Number(transaksiPendapatan3),
    },
    {
      tanggal: moment().subtract(1, 'd').format('DD-MM-YYYY'),
      transaksi:  Number(transaksiPendapatan2),
    },
  
    {
      tanggal: moment().format('DD-MM-YYYY'),
      transaksi: Number(transaksiPendapatan1),

    },
  ];


  const cancel = () => {
    history.push("/device-all")
  };
  useEffect(() => {
    getDetailMerchant();
  }, []);
  const getDetailMerchant = async (dataLatest) => {
    const decoded = jwtDecode(localStorage.token)
    const apiKey = decoded["api-key"]
    const headers = {
      'x-api-key': `${apiKey}`,
      'content-type': 'application/json',
    }
    const response = await fetch(
      `https://api.raspi-geek.com/v1/summary/${itemList.device_id}`,

      { method: "GET", headers }
    );
    const ajson = await response.json();
    setDetailMerchant(ajson.Records)
  }


  return (
    <>
      <Widget styleName={`gx-card-full gx-bg-${itemList.status}`} extra={<CloseCircleFilled style={{ fontSize: "25px" }} onClick={cancel} />}>
        <div className="gx-text-center gx-px-3 gx-pt-5 ">
          <div className="gx-d-flex gx-justify-content-around gx-align-items-center gx-mb-3">
            {/* <span> <i className="icon icon-chart gx-fs-xxl gx-text-grey"/><br/>{itemList.data_source}</span>
          <Avatar className="gx-size-80"  src="/assets/images/avatar.png"/>
          <span><i className="icon icon-chat gx-fs-xxl gx-text-dark"/><br/>{itemList.email}</span> */}

            <Col span={8}><span> <i className="icon icon-chart gx-fs-xxl gx-text-grey" /><br />{itemList.data_source}</span></Col>
            <Col span={8}><Avatar className="gx-size-80" src="/assets/images/avatar.png" /></Col>
            <Col span={8}><span><i className="icon icon-chat gx-fs-xxl gx-text-dark" /><br />{itemList.email}</span></Col>
          </div>
          <div className="gx-mb-3">
            <h2>{itemList.nama_usaha}</h2>
            <p className="gx-text-dark">{itemList.owner}</p>
          </div>
        </div>
        <div className="gx-rechart gx-mt-4">
          <div className="gx-rechart-prod">
            <div className="gx-d-flex gx-flex-row">
              <i className="icon icon-menu-up gx-text-geekblue gx-mr-2 gx-pt-1" />
              <h2 className="gx-text-geekblue">38%</h2>
            </div>
            <p className="gx-text-left gx-text-dark">{itemList.type_pajak}</p>
          </div>
          {/* <ResponsiveContainer width="100%" height={118}>
          <AreaChart data={data}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <Area type='monotone' dataKey="price" stackId="2" stroke='#4D95F3' fill="#038FDE" fillOpacity={1} />
          </AreaChart>
        </ResponsiveContainer> */}
        </div>
      </Widget>

      <div>
        {/* <ResponsiveContainer width="100%" height={118}>
          <AreaChart data={data}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <Area type='monotone' dataKey="price" stackId="2" stroke='#4D95F3' fill="#038FDE" fillOpacity={1} />
          </AreaChart>
        </ResponsiveContainer> */}
        <Row>
          <Typography style={{fontSize:"18px",fontWeight:"bold", margin:"20px 0", marginLeft:"10px"}}>Grafik Pendapatan</Typography>
        </Row>
        <ResponsiveContainer width="95%" height={300}>
          <ComposedChart
            data={dataPendapatan}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="tanggal" scale="band" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pendapatan" barSize={20} fill="#413ea0" />
            <Line type="monotone" dataKey="pendapatan" stroke="#ff7300" />
          </ComposedChart>
        </ResponsiveContainer>
        <Row>
          <Typography style={{fontSize:"18px",fontWeight:"bold", margin:"20px 0", marginLeft:"10px"}}>Grafik Transaksi</Typography>
        </Row>
        <ResponsiveContainer width="95%" height={300}>
          <ComposedChart
            data={dataTransaksi}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="tanggal" scale="band" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="transaksi" barSize={20} fill="#413ea0" />
            <Line type="monotone" dataKey="transaksi" stroke="#ff7300" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Productivity;
