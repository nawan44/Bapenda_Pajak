import React, { useState, useEffect } from "react";
import { Col } from "antd";
import EcommerceStatus from "../../../components/Metrics/EcommerceStatus";
import * as moment from "moment";
import "../../../assets/styles/flip-card.css";
import jwtDecode from "jwt-decode";
import { latestTransaction1 } from "../../../components/DataDummy";

const PendapatanHarian = (props) => {
  // const { latestTransaction, setLatestTransaction } = props;
  const latestTransaction = latestTransaction1.data;

  const now = moment().format('YYYY-MM-DD')
  const kemarin = moment().subtract(1, 'd').format('YYYY-MM-DD')

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
    setMoneyToday(earningToday === undefined ? 0 : Number(earningToday));
  }, [earningToday]);

  useEffect(() => {
    setMoneyYesterday(
      earningYesterday === undefined ? 0 : Number(earningYesterday)
    );
  }, [earningYesterday]);

// OLD

// const tanggal = latestTransaction && latestTransaction.map(row => ({
//   total_value: row[3].stringValue,
//   created_at:  moment(row[4].stringValue).format('YYYY-MM-DD')
// }));

// const data = latestTransaction && latestTransaction.map(row => ({
//   invoice_id: row[0].stringValue, 
//   merchant_id: row[1].stringValue,
//   nama_usaha : row[2].stringValue,
//   total_value: row[3].stringValue, 
//   created_at: row[4].stringValue
// }));
// const objToday = tanggal && tanggal.filter(o => o.created_at === now);
//   const currentToday = objToday && objToday.map(v => Number(v.total_value))
//     .reduce((sum, current) => sum + current, 0)
//   const objYesterday = tanggal && tanggal.filter(o => o.created_at === kemarin);
//   const currentYesterday = objYesterday && objYesterday.map(v => Number(v.total_value))
//     .reduce((sum, current) => sum + current, 0)

//     useEffect(() => {
//       setMoneyToday(currentToday);
//     }, [currentToday]);
    
//     useEffect(() => {
//       setMoneyYesterday(currentYesterday);
//     }, [currentYesterday]);

// OLD
  // NEWWWWWWWWWWWW
  useEffect(() => {
    getEarningToday();
  }, []);
 
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
  // NEWWWWWWWWWWWW

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
              <div className="title-card-dashboard">
                {earningToday === undefined
                  ? formatter.format(0)
                  : formatter.format(earningToday)}
              </div>
            //   <div className="title-card-dashboard">
            //   {currentToday === undefined
            //     ? formatter.format(0)
            //     : formatter.format(currentToday)}
            // </div>
            }
            colorTitle="indigo"
            moneyToday={moneyToday}
            setMoneyToday={setMoneyToday}
            moneyYesterday={moneyYesterday}
            setMoneyYesterday={setMoneyYesterday}
            subTitle={
              <div className="subtitle-card-dashboard">
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
              <div className="subtitle-card-dashboard-grey">
                {earningYesterday === undefined
                  ? formatter.format(0)
                  : formatter.format(earningYesterday)}
              </div>
            }
            colorTitle="dark"
            subTitle={
              <div className="subtitle-card-dashboard">
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
