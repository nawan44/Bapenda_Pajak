import React, {useState, useEffect} from "react";
import { Avatar } from "antd";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { CloseCircleFilled } from '@ant-design/icons';
import { Row, Col, Input, Button } from "antd";
import jwtDecode from "jwt-decode";

import Widget from "components/Widget/index";
import { useHistory } from "react-router-dom";

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
  console.log(itemList)
  const history = useHistory();
const [detailMerchant, setDetailMerchant] = useState()

const nominalPendapatan = detailMerchant && detailMerchant.map(row => ({
  // created_at:  moment(row[4].stringValue).format('MMMM YYYY'),

  hari1: Number(row[8].stringValue),
  hari2: Number(row[10].stringValue),
  hari3: Number(row[12].stringValue),
  hari4: Number(row[14].stringValue),
  hari5: Number(row[16].stringValue),
  hari6: Number(row[18].stringValue),
  hari7: Number(row[20].stringValue),

}));
const data = [
  {
    tanggal: 'Hari 1',
    pendapatan: nominalPendapatan?.hari1,
  
  },
  {
    tanggal: 'Hari 2',
    pendapatan: nominalPendapatan?.hari2,
  },
  {
    tanggal: 'Hari 3',
    pendapatan: nominalPendapatan?.hari3,
  },
  {
    tanggal: 'Hari 4',
    pendapatan: nominalPendapatan?.hari4,
  },
  {
    tanggal: 'Hari 5',
    pendapatan: nominalPendapatan?.hari5,
  },
  {
    tanggal: 'Hari 6',
    pendapatan: nominalPendapatan?.hari6,
  },
  {
    tanggal: 'Hari 7',
    pendapatan: nominalPendapatan?.hari7,
  },
];

console.log("data",data)

  const cancel = () => {
    history.push("/list-device-agent")
  };
  useEffect(() => {
    getDetailMerchant();
}, []);
const getDetailMerchant = async (dataLatest) => {
    const decoded = jwtDecode(localStorage.token)
    const apiKey = decoded["api-key"]
    const token = localStorage.getItem('token')
    const headers = {
        'x-api-key': `${apiKey}`,
        'content-type': 'application/json',

        'Authorization': `Bearer ${token}`
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
        <ResponsiveContainer width="100%" height={118}>
          <AreaChart data={data}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <Area type='monotone' dataKey="pendapatan" stackId="2" stroke='#4D95F3' fill="#038FDE" fillOpacity={1} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Productivity;
