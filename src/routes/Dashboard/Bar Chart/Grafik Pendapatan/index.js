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
import "../../../../assets/styles/flip-card.css";
import jwtDecode from "jwt-decode";
import { Select, Typography, Col, Row } from "antd";
import { DatePicker } from "antd";

const { Option } = Select;

const GrafikPendapatan = (props) => {
  // const {latestTransaction, setLatestTransactio} = props
  const [jenisChart, setJenisChart] = useState("Daily");
  const [bulanSelect, setBulanSelect] = useState("1");

  const [monthly, setMonthly] = useState();
  const [yearly, setYearly] = useState();
  const [tahunMonthly, setTahunMonthly] = useState(moment().format("YYYY"));

  const handleChangeSelect = (value) => {
    setJenisChart(value);
    setBulanSelect("1")
  };
  const handleChangeBulan = (value) => {
    setBulanSelect(value);
    getMonthly()
  };
  const handleTahunMonthly = (date, dateString) => {
    setTahunMonthly(dateString);
  };
  // useEffect(() => {
  //   if(jenisChart === "Monthly"){
  //   setBulanSelect("1");}
  // }, []);

  useEffect(() => {
    getMonthly();
  }, []);
  useEffect(() => {
    getMonthly();
  }, [bulanSelect]);
  
  const getMonthly = async (dataLatest) => {
    const decoded = jwtDecode(localStorage.token);
    const apiKey = decoded["api-key"];
    const headers = {
      "x-api-key": `${apiKey}`,
      "content-type": "application/json",
    };
    const response = await fetch(
      `https://api.raspi-geek.com/v1/daily?month=${bulanSelect}&year=${tahunMonthly}`,

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
      `https://api.raspi-geek.com/v1/monthly?year=${tahunMonthly}`,

      { method: "GET", headers }
    );
    const res = await response.json();
    setYearly(res.Records);
  };

  const bulan = monthly?.map((row) => ({
    created_at: moment(row[0].stringValue).format("DD/MM"),
    total_value: Number(row[1].stringValue),
  }));
  
let months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]

  const tahun = yearly?.map((row) => ({
    // created_at: row[0].longValue,
    // created_at :choiceBulan(),
    created_at : months[row[0].longValue],
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

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  const disabledDate = (current) => {
    let customDate = "2022";
    return current && current < moment(customDate, "YYYY");
  };
  return (
    <Widget
    styleName="gx-order-history"

      // styleName={`gx-order-history `}
      title={
        <div style={{ width: "500px" }}>
          <div style={{ width: "100%", float: "left" }}>
            {" "}
            <Typography
              style={{textAlign:"left", margin: "0", fontSize: "14px", fontWeight: "bold" }}
            >
              Grafik Pendapatan
            </Typography>
          </div>
          <div style={{ width: "25%", float: "left" }}>
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
          <div style={{ width: "30%", float: "left" }}>
            {jenisChart === "Daily" ? (
               <Select
               style={{ margin: "10px 0 0 0", width: "90%" }}
               name="bulanSelect"
               value={bulanSelect}
               onChange={handleChangeBulan}
             >
               <Option value="1">Januari</Option>
               <Option value="2">Februari</Option>
               <Option value="3">Maret</Option>
               <Option value="4">April</Option>
               <Option value="5">Mei</Option>
               <Option value="6">Juni</Option>
               <Option value="7">Juli</Option>
               <Option value="8">Agustus</Option>
               <Option value="9">September</Option>
               <Option value="10">Oktober</Option>
               <Option value="11">November</Option>
               <Option value="12">Desember</Option>

             </Select>
            ) : (
              <div></div>
            )}
          </div>
          <div style={{ width: "20%", float: "left", paddingTop: "7px" }}>
              <DatePicker
                disabledDate={disabledDate}
                defaultValue={moment("2022", "YYYY")}
                disabled
                onChange={handleTahunMonthly}
                picker="year"
              />
      
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

export default GrafikPendapatan;
