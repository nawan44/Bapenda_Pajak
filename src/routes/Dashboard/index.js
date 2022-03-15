import React, { useState, useEffect } from "react";
import {  Row } from "antd";
import TransaksiHariIni from "./Transaksi/TransaksiHariIni";
import TransaksiBulanIni from "./Transaksi/TransaksiBulanIni";
import TransaksiTahunIni from "./Transaksi/TransaksiTahunIni";
import "../../assets/styles/dashboard.css"
import PendapatanTahunIni from "./Pendapatan/PendapatanTahunIni";
import PendapatanBulanIni from "./Pendapatan/PendapatanBulanIni";
import PendapatanHariIni from "./Pendapatan/PendapatanHariIni";

import GrafikPendapatanBulan from "./Grafik Pendapatan/grafikPendapatanBulan";
import LatestTransaction from "./Latest Transaction";
import jwtDecode from "jwt-decode";

const SamplePage = () => {
  const [latestTransaction, setLatestTransaction] = useState()

  // const latestTransaction = [
  //  

  // ]
  // const setLatestTransaction = "AAA"



  useEffect(() => {
    getLatestTransaction();
  }, []);
   useEffect(() => {
    getLatestTransaction();
    const interval=setInterval(()=>{
      getLatestTransaction()
     },10000)
       
       
     return()=>clearInterval(interval)
  }, []);

  const getLatestTransaction = async (dataLatest) => {
    const decoded = jwtDecode(localStorage.token)
      const apiKey =decoded["api-key"]
      const token = localStorage.getItem('token')
      const headers = {
        'x-api-key': `${apiKey}`,
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      }

      const response = await fetch(
        "https://api.raspi-geek.com/v1/latestorder",

        { method: "GET", headers }
      );
      const ajson = await response.json();
      // setLatestTransaction(ajson)
      // setLatestTransaction(ajson.Records)
      setLatestTransaction(ajson.Records, )
  }
  // window.setTimeout( function() {
  //   window.location.reload();
  // }, 60000);
  return (
    <div>
      {/* <h2 className="title gx-mb-4"><IntlMessages id="sidebar.samplePage" /></h2> */}
      {/* <div className="gx-d-flex justify-content-center"> */}
      {/* <div className="container-dashboard1"  > */}
      <Row  className="container-dashboard1">
        <PendapatanHariIni latestTransaction={latestTransaction} setLatestTransaction={setLatestTransaction} />
        <PendapatanBulanIni latestTransaction={latestTransaction} setLatestTransaction={setLatestTransaction} />
        <PendapatanTahunIni latestTransaction={latestTransaction} setLatestTransaction={setLatestTransaction} />
        </Row>
      {/* </div> */}
      <Row className="container-dashboard2" type="flex" >
        <GrafikPendapatanBulan latestTransaction={latestTransaction} setLatestTransaction={setLatestTransaction} />
      </Row>
      <Row className="container-dashboard3">

        <TransaksiHariIni latestTransaction={latestTransaction} setLatestTransaction={setLatestTransaction} />
        <TransaksiBulanIni latestTransaction={latestTransaction} setLatestTransaction={setLatestTransaction} />
        <TransaksiTahunIni latestTransaction={latestTransaction} setLatestTransaction={setLatestTransaction} />
        </Row>
      <Row className="container-dashboard5">
        <LatestTransaction style={{ margin: "0px", textAlign: "center" }} latestTransaction={latestTransaction} setLatestTransaction={setLatestTransaction} />
      </Row> 
    </div>
  );
};

export default SamplePage;
