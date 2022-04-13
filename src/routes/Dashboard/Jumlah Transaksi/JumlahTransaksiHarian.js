import React, { useState, useEffect } from "react";
import { Col } from "antd";
import EcommerceStatus from "../../../components/Metrics/EcommerceStatus";
import * as moment from "moment";
import jwtDecode from "jwt-decode";
// import { latestTransaction1 } from "../../../components/DataDummy";

const JumlahTransaksiHarian = (props) => {
  // const { latestTransaction, setLatestTransaction } = props;
  // const latestTransaction = latestTransaction1.data;

  const [amountToday, setAmountToday] = useState();
  const [amountYesterday, setAmountYesterday] = useState();

  const [transactionToday, setTransactionToday] = useState();
  const [transactionYesterday, setTransactionYesterday] = useState();


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

    // OLDDDDD
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
    // const objTransactionToday = tanggal && tanggal.filter(o => o.created_at === now);
    // const transaksiHariIni = objTransactionToday?.length
    // const objTransactionYesterday = tanggal && tanggal.filter(o => o.created_at === kemarin);
    // const transaksiKemarin = objTransactionYesterday?.length
   
    // useEffect(() => {
    //   setTransactionToday(transaksiHariIni);
    // }, [transaksiHariIni]);
    
    // useEffect(() => {
    //   setTransactionYesterday(transaksiKemarin);
    // }, [transaksiKemarin]);
  
  // NEWWWW  
  useEffect(() => {
    setTransactionToday(amountToday === undefined ? 0 :Number(amountToday));
  }, [amountToday]);

  useEffect(() => {
    setTransactionYesterday(amountYesterday === undefined ? 0 :Number(amountYesterday));
  }, [amountYesterday]);
  useEffect(() => {
    getAmountToday();
  }, []);


  const getAmountToday = async () => {
    const decoded = jwtDecode(localStorage.token);
    const apiKey = decoded["api-key"];


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
    const res = await response.json();


    setAmountToday(res.Records[0][0].longValue);
  };

  useEffect(() => {
    getAmountYesterday();
  }, []);
  const getAmountYesterday = async () => {
    const decoded = jwtDecode(localStorage.token);
    const apiKey = decoded["api-key"];
  

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
    const res = await response.json();
    setAmountYesterday(res.Records[0][0].longValue);
  };
//NEWWW
  return (
    <Col className="transaksi-flip-card" xs={24} xl={8}>
      <div className="transaksi-flip-card-inner">
        <div className="transaksi-flip-card-front">
          <EcommerceStatus
            color="orange"
            icon="orders"
            title={
              <div  
              className="title-card-dashboard">
                {amountToday}</div>
              // <div  className="title-card-dashboard">{transaksiHariIni}</div>
           
            }
            colorTitle="geekblue"
            transactionToday={transactionToday}
            setTransactionToday={setTransactionToday}
            transactionYesterday ={transactionYesterday}
            setTransactionYesterday ={setTransactionYesterday}
            subTitle={
              <div  className="subtitle-card-dashboard">
                <span>Total Transaksi</span>
                <br />
                <span>(Hari Ini)</span>
              </div>
            }
            colorSubTitle="geekblue"
          />
        </div>
        <div className="transaksi-flip-card-back">
          <EcommerceStatus
            icon="orders"
            color="grey"
            title={
              <div  className="subtitle-card-dashboard-grey">{transactionYesterday}</div>
            }
            colorTitle="dark"
            subTitle={
              <div  className="subtitle-card-dashboard">
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
