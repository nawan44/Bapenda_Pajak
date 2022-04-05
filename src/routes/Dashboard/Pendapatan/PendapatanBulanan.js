import React, { useState, useEffect } from "react";
import { Col } from "antd";
import EcommerceStatus from "../../../components/Metrics/EcommerceStatus";
import * as moment from "moment";
import "../../../assets/styles/flip-card.css";
import { latestTransaction1 } from "../../../components/DataDummy";
import jwtDecode from "jwt-decode";

const PendapatanBulanan = (props) => {
  // const {latestTransaction, setLatestTransactio} = props

  const latestTransaction = latestTransaction1.data;

  // const [earningThisMonth, setEarningThisMonth] = useState();

  // Hotel
  const [earningThisMonth1, setEarningThisMonth1] = useState(0);
  //Parkir
  const [earningThisMonth2, setEarningThisMonth2] = useState(0);
  //Restoran
  const [earningThisMonth3, setEarningThisMonth3] = useState(0);

  // const [earningLastMonth, setEarningLastMonth] = useState();

  // Hotel
  const [earningLastMonth1, setEarningLastMonth1] = useState(0);
  //Parkir
  const [earningLastMonth2, setEarningLastMonth2] = useState(0);
  //Restoran
  const [earningLastMonth3, setEarningLastMonth3] = useState(0);

  const bulanIni = moment().format("YYYY-MM");
  const bulanLalu = moment().subtract(1, "months").format("YYYY-MM");

  const sThisMonth = moment().startOf("month").format("YYYY-MM-DD HH:mm:ss");
  const eThisMonth = moment().endOf("month").format("YYYY-MM-DD HH:mm:ss");
  const sLastMonth = moment()
    .subtract(1, "month")
    .startOf("month")
    .format("YYYY-MM-DD HH:mm:ss");
  const eLastMonth = moment()
    .subtract(1, "month")
    .endOf("month")
    .format("YYYY-MM-DD HH:mm:ss");

  // OLLLDDDDD

  const [moneyThisMonth, setMoneyThisMonth] = useState();
  const [moneyLastMonth, setMoneyLastMonth] = useState();

  // const bulan =
  //   latestTransaction &&
  //   latestTransaction.map((row) => ({
  //     total_value: row[3].stringValue,
  //     created_at: moment(row[4].stringValue).format("YYYY-MM"),
  //   }));
  // const objBulanIni = bulan && bulan.filter((o) => o.created_at === bulanIni);
  // const currentBulanIni =
  //   objBulanIni &&
  //   objBulanIni
  //     .map((v) => Number(v.total_value))
  //     .reduce((sum, current) => sum + current, 0);

  // const objBulanLalu = bulan && bulan.filter((o) => o.created_at === bulanLalu);
  // const currentBulanLalu =
  //   objBulanLalu &&
  //   objBulanLalu
  //     .map((v) => Number(v.total_value))
  //     .reduce((sum, current) => sum + current, 0);

  // useEffect(() => {
  //   setMoneyThisMonth(currentBulanIni === undefined ? 0 : currentBulanIni);
  // }, [currentBulanIni]);

  // useEffect(() => {
  //   setMoneyLastMonth(currentBulanLalu === undefined ? 0 : currentBulanLalu);
  // }, [currentBulanLalu]);

  // NEWWWWWWWWWWWW


  // useEffect(
  //   () => {
  //     setEarningThisMonth(
  //       Number(earningThisMonth1) +
  //         Number(earningThisMonth2) +
  //         Number(earningThisMonth3)
  //     );
  //   },
  //   [earningThisMonth1],
  //   [earningThisMonth2],
  //   [earningThisMonth3]
  // );



  useEffect(() => {
    getEarningThisMonth();
  }, []);

  const getEarningThisMonth = async () => {
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
          startdate: sThisMonth,
          enddate: eThisMonth,
        }),
      }
    );
    const ajson = await response.json();

    setEarningThisMonth1(ajson.Records[0][1].stringValue);
    setEarningThisMonth2(ajson.Records[1][1].stringValue);
    setEarningThisMonth3(ajson.Records[2][1].stringValue);
  };

  // useEffect(
  //   () => {
  //     setEarningLastMonth(
  //       Number(earningLastMonth1) +
  //         Number(earningLastMonth2) +
  //         Number(earningLastMonth3)
  //     );
  //   },
  //   [earningLastMonth1],
  //   [earningLastMonth2],
  //   [earningLastMonth3]
  // );
  const earningLastMonth =  Number(earningLastMonth1) + Number(earningLastMonth2) + Number(earningLastMonth3)

  console.log("earningLastMonth", earningLastMonth);

  console.log("earning 1", earningLastMonth1);
  console.log("earning 2", earningLastMonth2);
  console.log("earning 3", earningLastMonth3);

  const earningThisMonth =  Number(earningThisMonth1) + Number(earningThisMonth2) + Number(earningThisMonth3)
  
  console.log("earningThisMonth", earningThisMonth);

  console.log("earningThisMonth 1", earningThisMonth1);
  console.log("earningThisMonth 2", earningThisMonth2);
  console.log("earningThisMonth 3", earningThisMonth3);


  useEffect(() => {
    getEarningLastMonth();
  }, []);

  const getEarningLastMonth = async () => {
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
          startdate: sLastMonth,
          enddate: eLastMonth,
        }),
      }
    );
    const ajson = await response.json();
    setEarningLastMonth1(ajson.Records[0][1].stringValue);
    setEarningLastMonth2(ajson.Records[1][1].stringValue);
    setEarningLastMonth3(ajson.Records[2][1].stringValue);
  };
  useEffect(() => {
    setMoneyThisMonth(earningThisMonth);
  }, [earningThisMonth]);

  useEffect(() => {
    setMoneyLastMonth(earningLastMonth);
  }, [earningLastMonth]);
  const total = Number(moneyLastMonth) - Number(moneyThisMonth);
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  return (
    <Col className="flip-card" xs={24} xl={8}>
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <EcommerceStatus
            color="teal"
            icon="revenue-new"
            title={
              // <div className="title-card-dashboard">
              //   {currentBulanIni === undefined
              //     ? formatter.format(0)
              //     : formatter.format(currentBulanIni)}
              // </div>

              <div className="title-card-dashboard">
                {earningThisMonth === undefined
                  ? formatter.format(0)
                  : formatter.format(earningThisMonth)}
              </div>
            }
            colorTitle="geekblue"
            moneyThisMonth={moneyThisMonth}
            setMoneyThisMonth={setMoneyThisMonth}
            moneyLastMonth={moneyLastMonth}
            setMoneyLastMonth={setMoneyLastMonth}
            // objBulanIni={objBulanIni}
            subTitle={
              <div className="subtitle-card-dashboard">
                <span>Total Pendapatan</span>
                <br />
                <span>(Bulan Ini)</span>
              </div>
            }
            colorSubTitle="geekblue"
          />
        </div>
        <div class="flip-card-back">
          <EcommerceStatus
            icon="revenue-new"
            color="grey"
            title={
              // <div  className="subtitle-card-dashboard-grey">
              //   {currentBulanLalu === undefined
              //     ? formatter.format(0)
              //     : formatter.format(currentBulanLalu)}
              // </div>

              <div className="subtitle-card-dashboard-grey">
                {earningLastMonth === undefined
                  ? formatter.format(0)
                  : formatter.format(earningLastMonth)}
              </div>
            }
            colorTitle="dark"
            subTitle={
              <div className="subtitle-card-dashboard">
                <span>Total Pendapatan</span>
                <br />
                <span>(Bulan Lalu)</span>
              </div>
            }
            colorSubTitle="dark"
          />
        </div>
      </div>
    </Col>
  );
};

export default PendapatanBulanan;
