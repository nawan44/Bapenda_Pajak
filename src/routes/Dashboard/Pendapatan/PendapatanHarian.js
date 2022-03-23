import React, { useState, useEffect } from "react";
import { Col } from "antd";
import EcommerceStatus from "../../../components/Metrics/EcommerceStatus";
import * as moment from "moment";
import "../../../assets/styles/flip-card.css";
import jwtDecode from "jwt-decode";

const PendapatanHarian = (props) => {
  // const { latestTransaction, setLatestTransaction } = props;

  const [earningToday, setEarningToday] = useState();
  const [earningYesterday, setEarningYesterday] = useState();

  const [moneyToday, setMoneyToday] = useState();
  const [moneyYesterday, setMoneyYesterday] = useState();
 
  const sToday = moment().startOf("day").format("YYYY-MM-DD HH:mm:ss");
  const eToday = moment().endOf("day").format("YYYY-MM-DD HH:mm:ss");
  const sYesterday = moment()
    .subtract(1, "d")
    .startOf("day")
    .format("YYYY-MM-DD HH:mm:ss");
  const eYesterday = moment()
    .subtract(1, "d")
    .endOf("day")
    .format("YYYY-MM-DD HH:mm:ss");

    useEffect(() => {
      setMoneyToday(Number(earningToday));
    }, [earningToday]);
  
    useEffect(() => {
      setMoneyYesterday(Number(earningYesterday));
    }, [earningYesterday]);

  useEffect(() => {
    getEarningToday();
  }, []);
  // useEffect(() => {
  //   getEarningToday();
  //    const interval=setInterval(()=>{
  //     getEarningToday()
  //    },10000)
  //    return()=>clearInterval(interval)
  // }, []);
  const getEarningToday = async () => {
    const decoded = jwtDecode(localStorage.token);
    const apiKey = decoded["api-key"];
    const headers = {
      "x-api-key": `${apiKey}`,
      "content-type": "application/json",
    };

    const response = await fetch(
      "https://api.raspi-geek.com/v1/values",

      {
        method: "POST",
        headers: {
          "x-api-key": `${apiKey}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          startdate: sToday,
          enddate: eToday,
        }),
      }
    );
    const ajson = await response.json();
    setEarningToday(ajson.Records[0][0].stringValue);
  };

  useEffect(() => {
    getEarningYesterday();
  }, []);
  // useEffect(() => {
  //   getEarningYesterday();
  //    const interval=setInterval(()=>{
  //     getEarningYesterday()
  //    },10000)
  //    return()=>clearInterval(interval)
  // }, []);
  const getEarningYesterday = async () => {
    const decoded = jwtDecode(localStorage.token);
    const apiKey = decoded["api-key"];
    const headers = {
      "x-api-key": `${apiKey}`,
      "content-type": "application/json",
    };

    const response = await fetch(
      "https://api.raspi-geek.com/v1/values",

      {
        method: "POST",
        headers: {
          "x-api-key": `${apiKey}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          startdate: sYesterday,
          enddate: eYesterday,
        }),
      }
    );
    const ajson = await response.json();
    setEarningYesterday(ajson.Records[0][0].stringValue);
  };

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  return (
    <Col className="flip-card" xs={24} xl={8}>
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <EcommerceStatus
            color="green"
            icon="revenue-new"
            title={
              <div style={{ marginBottom: "35px" }}>
                {formatter.format(earningToday)}
              </div>
            }
            colorTitle="indigo"
            moneyToday ={moneyToday}
            setMoneyToday ={setMoneyToday}
            moneyYesterday={moneyYesterday}
            setMoneyYesterday ={setMoneyYesterday}
            subTitle={
              <div>
                <span>Total Pendapatan</span>
                <br />
                <span>(Hari Ini)</span>
              </div>
            }
            colorSubTitle="indigo"
          />
        </div>
        <div className="flip-card-back">
          <EcommerceStatus
            icon="revenue-new"
            color="grey"
            title={
              <div style={{ marginBottom: "115px" }}>
                {formatter.format(earningYesterday)}
              </div>
            }
            colorTitle="dark"
            subTitle={
              <div>
                <span>Total Pendapatan</span>
                <br />
                <span>(Kemarin)</span>
              </div>
            }
            colorSubTitle="dark"
          />
        </div>
      </div>
    </Col>
  );
};

export default PendapatanHarian;
