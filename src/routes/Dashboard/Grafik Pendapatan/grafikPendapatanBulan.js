import React, { useState, useEffect } from "react";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import * as moment from "moment";
import Widget from "components/Widget/index";
import "moment/locale/id";
import "../../../assets/styles/flip-card.css";
import jwtDecode from "jwt-decode";
import { Select, Typography, Col, Row } from "antd";
import { DatePicker } from 'antd';

const { Option } = Select;

const latestTransaction = [
  [
    {
      stringValue: "5bda50ab-9940-11ec-8a2c-a97e6ec00a1c",
    },
    {
      stringValue: "DEJARDIN0001",
    },
    {
      stringValue: "Rumah Makan Sederhana",
    },
    {
      stringValue: "534650.00",
    },
    {
      stringValue: "2022-01-19 16:14:00",
    },
  ],
  [
    {
      stringValue: "5bda50ab-9940-11ec-8a2c-a97e6ec00a1c",
    },
    {
      stringValue: "DEJARDIN0001",
    },
    {
      stringValue: "Rumah Makan Sederhana",
    },
    {
      stringValue: "734650.00",
    },
    {
      stringValue: "2022-02-11 16:14:00",
    },
  ],
  [
    {
      stringValue: "5bda50ab-9940-11ec-8a2c-a97e6ec00a1c",
    },
    {
      stringValue: "DEJARDIN0001",
    },
    {
      stringValue: "Rumah Makan Sederhana",
    },
    {
      stringValue: "834650.00",
    },
    {
      stringValue: "2022-03-19 16:14:00",
    },
  ],
  [
    {
      stringValue: "5bda50ab-9940-11ec-8a2c-a97e6ec00a1c",
    },
    {
      stringValue: "DEJARDIN0001",
    },
    {
      stringValue: "Rumah Makan Sederhana",
    },
    {
      stringValue: "634650.00",
    },
    {
      stringValue: "2022-04-19 16:14:00",
    },
  ],
  [
    {
      stringValue: "5bda50ab-9940-11ec-8a2c-a97e6ec00a1c",
    },
    {
      stringValue: "DEJARDIN0001",
    },
    {
      stringValue: "Rumah Makan Sederhana",
    },
    {
      stringValue: "764650.00",
    },
    {
      stringValue: "2022-05-19 16:14:00",
    },
  ],
  [
    {
      stringValue: "5bda50ab-9940-11ec-8a2c-a97e6ec00a1c",
    },
    {
      stringValue: "DEJARDIN0001",
    },
    {
      stringValue: "Rumah Makan Sederhana",
    },
    {
      stringValue: "834650.00",
    },
    {
      stringValue: "2022-06-19 16:14:00",
    },
  ],
  [
    {
      stringValue: "5bda50ab-9940-11ec-8a2c-a97e6ec00a1c",
    },
    {
      stringValue: "DEJARDIN0001",
    },
    {
      stringValue: "Rumah Makan Sederhana",
    },
    {
      stringValue: "934650.00",
    },
    {
      stringValue: "2022-07-19 16:14:00",
    },
  ],
];

const GrafikPendapatanBulan = (props) => {
  // const {latestTransaction, setLatestTransactio} = props
  const [jenisChart, setJenisChart] = useState("Daily");

  const [monthly, setMonthly] = useState();
  const [yearly, setYearly] = useState();
  const [tahunMonthly, setTahunMonthly] = useState(moment().format("YYYY"));

  useEffect(() => {
    getMonthly();
  }, []);

  const getMonthly = async (dataLatest) => {
    const decoded = jwtDecode(localStorage.token);
    const apiKey = decoded["api-key"];
    const headers = {
      "x-api-key": `${apiKey}`,
      "content-type": "application/json",
    };
    const response = await fetch(
      "https://api.raspi-geek.com/v1/daily",

      { method: "GET", headers }
    );
    const res = await response.json();
    setMonthly(res.Records);
  };
  useEffect(() => {
    getYearly();
  }, []);

  const getYearly = async (dataLatest) => {
    const decoded = jwtDecode(localStorage.token);
    const apiKey = decoded["api-key"];
    const headers = {
      "x-api-key": `${apiKey}`,
      "content-type": "application/json",
    };
    const response = await fetch(
      "https://api.raspi-geek.com/v1/monthly?year=2022",

      { method: "GET", headers }
    );
    const res = await response.json();
    setYearly(res.Records);
  };
  const bulan = monthly?.map((row) => ({
    created_at: moment(row[0].stringValue).format("DD/MM/YY"),
    total_value: Number(row[1].stringValue),
  }));

  const tahun = yearly?.map((row) => ({
    created_at: row[0].longValue,
    total_value: Number(row[1].stringValue),
  }));
  // const shooters = bulan?.reduce(
  //   (results, current, ) => ({
  //     ...results,
  //     [current.created_at ]: {
  //       created_at: current.created_at,
  //       total_value: current.total_value + (results[current.created_at] ? results[current.created_at].total_value : 0),
  //     }
  //   }),
  //   {}
  // );
  console.log("tahun", tahun);
  const handleChangeSelect = (value) => {
    setJenisChart(value);
  };
  const handleTahunMonthly = (date, dateString) => {
    setTahunMonthly(dateString);
  };
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  const disabledDate =(current) => {
    let customDate = "2022";
    return current && current < moment(customDate, "YYYY");
  }
  return (
    <Widget
      styleName="gx-order-history"
      style={{ backgroundColor: "red" }}
      title={
        <div style={{ width: "500px" }}>
          <div style={{ width: "25%", float: "left" }}>
            {" "}
            <Typography
              style={{ margin: "15px 0", fontSize: "14px", fontWeight: "bold" }}
            >
              Jenis Grafik
            </Typography>
          </div>
          <div style={{ width: "30%", float: "left" }}>
            {" "}
            <Select
              style={{ margin: "10px 0 0 0", width: "90%" }}
              name="jenisChart"
              value={jenisChart}
              onChange={handleChangeSelect}
            >
              <Option value="Daily">Daily</Option>
              <Option value="Monthly">Monthly</Option>
            </Select>
          </div>
          <div style={{ width: "35%", float: "left", paddingTop: "7px" }}>
            {jenisChart === "Monthly" ? (
  <DatePicker
  disabledDate={disabledDate} 
  defaultValue={moment('2022', 'YYYY')} 
   disabled
   onChange={handleTahunMonthly} picker="year" />            ) : (
              <div></div>
            )}
          </div>
        </div>
      }
    >
      <ResponsiveContainer width="95%" height={300}>
        <ComposedChart
          data={jenisChart === "Daily" ? bulan : tahun}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="created_at" scale="band" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total_value" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="total_value" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
    </Widget>
  );
};

export default GrafikPendapatanBulan;
