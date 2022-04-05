import React, { useState, useEffect } from "react";
import { Col } from "antd";
import EcommerceStatus from "../../../components/Metrics/EcommerceStatus";
import * as moment from "moment";
import "../../../assets/styles/flip-card.css";
import jwtDecode from "jwt-decode";

const PendapatanTahunan = (props) => {
  const { latestTransaction, setLatestTransaction, getLatestTransaction } =
    props;
  const tahunIni = moment().format("YYYY");
  const tahunLalu = moment().subtract(1, "years").format("YYYY");

  const [moneyThisYear, setMoneyThisYear] = useState();
  const [moneyLastYear, setMoneyLastYear] = useState();

// Hotel
const [earningThisYear1, setEarningThisYear1] = useState(0);
//Parkir
const [earningThisYear2, setEarningThisYear2] = useState(0);
//Restoran
const [earningThisYear3, setEarningThisYear3] = useState(0);

// const [earningLastYear, setEarningLastYear] = useState();

// Hotel
const [earningLastYear1, setEarningLastYear1] = useState(0);
//Parkir
const [earningLastYear2, setEarningLastYear2] = useState(0);
//Restoran
const [earningLastYear3, setEarningLastYear3] = useState(0);

const sThisYear = moment().startOf("year").format("YYYY-MM-DD HH:mm:ss");
const eThisYear = moment().endOf("year").format("YYYY-MM-DD HH:mm:ss");
const sLastYear = moment()
  .subtract(1, "year")
  .startOf("year")
  .format("YYYY-MM-DD HH:mm:ss");
const eLastYear = moment()
  .subtract(1, "year")
  .endOf("year")
  .format("YYYY-MM-DD HH:mm:ss");

  useEffect(() => {
    getEarningThisYear();
  }, []);

  const getEarningThisYear = async () => {
    const decoded = jwtDecode(localStorage.token);
    const apiKey = decoded["api-key"];
    // const headers = {
    //   "x-api-key": `${apiKey}`,
    //   "content-type": "application/json",
    // };
    const response = await fetch(
      "https://api.raspi-geek.com/v1/earnsbycat",

      {
        method: "POST",
        headers: {
          "x-api-key": `${apiKey}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          startdate: sThisYear,
          enddate: eThisYear,
        }),
      }
    );
    const ajson = await response.json();

    setEarningThisYear1(ajson.Records[0][1].stringValue);
    setEarningThisYear2(ajson.Records[1][1].stringValue);
    setEarningThisYear3(ajson.Records[2][1].stringValue);
  };

  useEffect(() => {
    getEarningLastYear();
  }, []);

  const getEarningLastYear = async () => {
    const decoded = jwtDecode(localStorage.token);
    const apiKey = decoded["api-key"];
    // const headers = {
    //   "x-api-key": `${apiKey}`,
    //   "content-type": "application/json",
    // };
    const response = await fetch(
      "https://api.raspi-geek.com/v1/earnsbycat",

      {
        method: "POST",
        headers: {
          "x-api-key": `${apiKey}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          startdate: sLastYear,
          enddate: eLastYear,
        }),
      }
    );
    const ajson = await response.json();
    setEarningLastYear1(ajson.Records[0][1].stringValue);
    setEarningLastYear2(ajson.Records[1][1].stringValue);
    setEarningLastYear3(ajson.Records[2][1].stringValue);
  };

  const earningLastYear =  Number(earningLastYear1) + Number(earningLastYear2) + Number(earningLastYear3)

  console.log("earningLastYear", earningLastYear);

  console.log("earning 1", earningLastYear1);
  console.log("earning 2", earningLastYear2);
  console.log("earning 3", earningLastYear3);

  const earningThisYear =  Number(earningThisYear1) + Number(earningThisYear2) + Number(earningThisYear3)
  
  console.log("earningThisYear", earningThisYear);

  console.log("earningThisYear 1", earningThisYear1);
  console.log("earningThisYear 2", earningThisYear2);
  console.log("earningThisYear 3", earningThisYear3);
  // OLD
  // const tahun =
  //   latestTransaction &&
  //   latestTransaction.map((row) => ({
  //     total_value: row[3].stringValue,
  //     created_at: moment(row[4].stringValue).format("YYYY"),
  //   }));
  // const objTahunIni = tahun && tahun.filter((o) => o.created_at === tahunIni);
  // const currentTahunIni =
  //   objTahunIni &&
  //   objTahunIni
  //     .map((v) => Number(v.total_value))
  //     .reduce((sum, current) => sum + current, 0);

  // const objTahunLalu = tahun && tahun.filter((o) => o.created_at === tahunLalu);
  // const currentTahunLalu =
  //   objTahunLalu &&
  //   objTahunLalu
  //     .map((v) => Number(v.total_value))
  //     .reduce((sum, current) => sum + current, 0);

  // useEffect(() => {
  //   setMoneyThisYear(currentTahunIni === undefined ? 0 : currentTahunIni);
  // }, [currentTahunIni]);

  // useEffect(() => {
  //   setMoneyLastYear(currentTahunLalu === undefined ? 0 : currentTahunLalu);
  // }, [currentTahunLalu]);

  useEffect(() => {
    setMoneyThisYear(earningThisYear);
  }, [earningThisYear]);

  useEffect(() => {
    setMoneyLastYear(earningLastYear);
  }, [earningLastYear]);

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  return (
    <Col className="flip-card" xs={24} xl={8}>
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <EcommerceStatus
            color="white"
            icon="revenue-new"
            title={
              // <div className="title-card-dashboard">
              //   {currentTahunIni === undefined
              //     ? formatter.format(0)
              //     : formatter.format(currentTahunIni)}
              // </div>
              <div className="title-card-dashboard">
              {earningThisYear === undefined
                ? formatter.format(0)
                : formatter.format(earningThisYear)}
            </div>
            }
            colorTitle="primary"
            moneyThisYear={moneyThisYear}
            setMoneyThisYear={setMoneyThisYear}
            moneyLastYear={moneyLastYear}
            setMoneyLastYear={setMoneyLastYear}
            // objTahunIni={objTahunIni}
            subTitle={
              <div  className="subtitle-card-dashboard">
                <span>Total Pendapatan</span>
                <br />
                <span>(Tahun Ini)</span>
              </div>
            }
            colorSubTitle="primary"
          />
        </div>
        <div class="flip-card-back">
          <EcommerceStatus
            icon="revenue-new"
            color="grey"
            title={
              // <div  className="subtitle-card-dashboard-grey">
              //   {currentTahunLalu === undefined
              //     ? formatter.format(0)
              //     : formatter.format(currentTahunLalu)}
              // </div>
              <div  className="subtitle-card-dashboard-grey">
              {earningLastYear === undefined
                ? formatter.format(0)
                : formatter.format(earningLastYear)}
            </div>
            }
            colorTitle="dark"
            // moneyToday={moneyToday} setMoneyToday ={setMoneyToday} moneyYesterday={moneyYesterday} setMoneyYesterday={setMoneyYesterday}
            subTitle={
              <div  className="subtitle-card-dashboard">
                <span>Total Pendapatan</span>
                <br />
                <span>(Tahun Lalu)</span>
              </div>
            }
            colorSubTitle="dark"
          />
        </div>
      </div>
    </Col>
  );
};

export default PendapatanTahunan;
