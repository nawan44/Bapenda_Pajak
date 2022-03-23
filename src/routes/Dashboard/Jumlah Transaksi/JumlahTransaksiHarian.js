import React, { useState, useEffect } from "react";
import { Col } from "antd";
import EcommerceStatus from "../../../components/Metrics/EcommerceStatus";
import * as moment from "moment";
import jwtDecode from "jwt-decode";

const JumlahTransaksiHarian = (props) => {
  const { latestTransaction, setLatestTransaction } = props;

  const [amountToday, setAmountToday] = useState();
  const [amountYesterday, setAmountYesterday] = useState();

  const [transactionToday, setTransactionToday] = useState();
  const [transactionYesterday, setTransactionYesterday] = useState();
 
  console.log("amountToday",amountToday)
  console.log("amountYesterday",amountYesterday)

  console.log("transactionToday",transactionToday)
  console.log("transactionYesterday",transactionYesterday)

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
    setTransactionToday(Number(amountToday));
  }, [amountToday]);

  useEffect(() => {
    setTransactionYesterday(Number(amountYesterday));
  }, [amountYesterday]);
  useEffect(() => {
    getAmountToday();
  }, []);
  // useEffect(() => {
  //   getAmountToday();
  //    const interval=setInterval(()=>{
  //     getAmountToday()
  //    },10000)
  //    return()=>clearInterval(interval)
  // }, []);
  const getAmountToday = async () => {
    const decoded = jwtDecode(localStorage.token);
    const apiKey = decoded["api-key"];
    const headers = {
      "x-api-key": `${apiKey}`,
      "content-type": "application/json",
    };

    const response = await fetch(
      "https://api.raspi-geek.com/v1/orders",

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
    setAmountToday(ajson.Records[0][0].longValue);
  };

  useEffect(() => {
    getAmountYesterday();
  }, []);
  // useEffect(() => {
  //   getAmountYesterday();
  //    const interval=setInterval(()=>{
  //     getAmountYesterday()
  //    },10000)
  //    return()=>clearInterval(interval)
  // }, []);
  const getAmountYesterday = async () => {
    const decoded = jwtDecode(localStorage.token);
    const apiKey = decoded["api-key"];
    const headers = {
      "x-api-key": `${apiKey}`,
      "content-type": "application/json",
    };

    const response = await fetch(
      "https://api.raspi-geek.com/v1/orders",

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
    setAmountYesterday(ajson.Records[0][0].longValue);
  };

  return (
    <Col className="flip-card" xs={24} xl={8}>
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <EcommerceStatus
            color="orange"
            icon="orders"
            title={
              <div style={{ marginBottom: "35px" }}>{amountToday}</div>
            }
            colorTitle="geekblue"
            transactionToday={transactionToday}
            setTransactionToday={setTransactionToday}
            transactionYesterday ={transactionYesterday}
            setTransactionYesterday ={setTransactionYesterday}
            subTitle={
              <div>
                <span>Total Transaksi</span>
                <br />
                <span>(Hari Ini)</span>
              </div>
            }
            colorSubTitle="geekblue"
          />
        </div>
        <div class="flip-card-back">
          <EcommerceStatus
            icon="orders"
            color="grey"
            title={
              <div style={{ marginBottom: "115px" }}>{transactionYesterday}</div>
            }
            colorTitle="dark"
            subTitle={
              <div>
                <span>Total Transaksi</span>
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

export default JumlahTransaksiHarian;
