import React, { useState, useEffect } from "react";
import { Col } from "antd";
import EcommerceStatus from "../../../components/Metrics/EcommerceStatus";
import * as moment from "moment";
import jwtDecode from "jwt-decode";

const JumlahTransaksiTahunan = (props) => {
  const { latestTransaction, setLatestTransaction } = props;
  const [transactionThisYear, setTransactionThisYear] = useState();
  const [transactionLastYear, setTransactionLastYear] = useState();
// Hotel
const [amountThisYear1, setAmountThisYear1] = useState(0);
//Parkir
const [amountThisYear2, setAmountThisYear2] = useState(0);
//Restoran
const [amountThisYear3, setAmountThisYear3] = useState(0);

// const [amountLastYear, setamountLastYear] = useState();

// Hotel
const [amountLastYear1, setAmountLastYear1] = useState(0);
//Parkir
const [amountLastYear2, setAmountLastYear2] = useState(0);
//Restoran
const [amountLastYear3, setAmountLastYear3] = useState(0);

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

  // const tahunIni = moment().format("YYYY");
  // const tahunLalu = moment().subtract(1, "years").format("YYYY");
  // const tahun =
  //   latestTransaction &&
  //   latestTransaction.map((row) => ({
  //     total_value: row[3].stringValue,
  //     created_at: moment(row[4].stringValue).format("YYYY"),
  //   }));

  // const data =
  //   latestTransaction &&
  //   latestTransaction.map((row) => ({
  //     invoice_id: row[0].stringValue,
  //     merchant_id: row[1].stringValue,
  //     nama_usaha: row[2].stringValue,
  //     total_value: row[3].stringValue,
  //     created_at: row[4].stringValue,
  //   }));
  // const objTransactionThisYear =
  //   tahun && tahun.filter((o) => o.created_at === tahunIni);

  // // const transaksiTahunIni =5
  // // const transaksiTahunLalu=5
  // const transaksiTahunIni = objTransactionThisYear?.length;

  // const objTransactionLastYear =
  //   tahun && tahun.filter((o) => o.created_at === tahunLalu);

  // const transaksiTahunLalu = objTransactionLastYear?.length;
  // //

  // useEffect(() => {
  //   setTransactionThisYear(
  //     transaksiTahunIni === undefined ? 0 : transaksiTahunIni
  //   );
  // }, [transaksiTahunIni]);

  // useEffect(() => {
  //   setTransactionLastYear(
  //     transaksiTahunLalu === undefined ? 0 : transaksiTahunLalu
  //   );
  // }, [transaksiTahunLalu]);
useEffect(() => {
    getAmountThisYear();
  }, []);

  const getAmountThisYear = async () => {
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

    setAmountThisYear1(ajson.Records[0][1].stringValue);
    setAmountThisYear2(ajson.Records[1][1].stringValue);
    setAmountThisYear3(ajson.Records[2][1].stringValue);
  };
  const amountLastYear =  Number(amountLastYear1) + Number(amountLastYear2) + Number(amountLastYear3)
  const amountThisYear =  Number(amountThisYear1) + Number(amountThisYear2) + Number(amountThisYear3)
  
  useEffect(() => {
    getAmountLastYear();
  }, []);

  const getAmountLastYear = async () => {
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
    setAmountLastYear1(ajson.Records[0][1].stringValue);
    setAmountLastYear2(ajson.Records[1][1].stringValue);
    setAmountLastYear3(ajson.Records[2][1].stringValue);
  };
  useEffect(() => {
    setTransactionThisYear(amountThisYear);
  }, [amountThisYear]);

  useEffect(() => {
    setTransactionLastYear(amountLastYear);
  }, [amountLastYear]);
  return (
    <Col className="flip-card" xs={24} xl={8}>
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <EcommerceStatus
            color="white"
            icon="orders"
            title={
              <div className="title-card-dashboard">{amountThisYear}</div>
            }
            colorTitle="primary"
            transactionThisYear={transactionThisYear}
            setTransactionThisYear={setTransactionThisYear}
            transactionLastYear={transactionLastYear}
            setTransactionLastYear={setTransactionLastYear}
            // objTransactionThisYear={objTransactionThisYear}
            subTitle={
              <div  className="subtitle-card-dashboard">
                <span>Total Transaksi</span>
                <br />
                <span>(Tahun Ini)</span>
              </div>
            }
            colorSubTitle="primary"
          />

          {/* <EcommerceStatus color="orange" icon="orders" title="4" colorTitle="geekblue"
                     subTitle="Total Transaksi (Hari Ini)" colorSubTitle="geekblue"/> */}
        </div>
        <div class="flip-card-back">
          <EcommerceStatus
            icon="orders"
            color="grey"
            title={
              <div  className="subtitle-card-dashboard-grey">{amountLastYear}</div>
            }
            colorTitle="dark"
            subTitle={
              <div  className="subtitle-card-dashboard">
                <span>Total Transaksi</span>
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

export default JumlahTransaksiTahunan;
