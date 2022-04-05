import React, { useState, useEffect } from "react";
import {  Row } from "antd";
import JumlahTransaksiHarian from "./Jumlah Transaksi/JumlahTransaksiHarian";
import JumlahTransaksiBulanan from "./Jumlah Transaksi/JumlahTransaksiBulanan";
import JumlahTransaksiTahunan from "./Jumlah Transaksi/JumlahTransaksiTahunan";
import "../../assets/styles/dashboard.css"
import PendapatanTahunan from "./Pendapatan/PendapatanTahunan";
import PendapatanBulanan from "./Pendapatan/PendapatanBulanan";
import PendapatanHarian from "./Pendapatan/PendapatanHarian";

import GrafikPendapatanBulan from "./Grafik Pendapatan/grafikPendapatanBulan";
import LatestTransaction from "./Latest Transaction";
import jwtDecode from "jwt-decode";
import PieChart from "./Pie Chart";
import GrafikTransaksi from "./Grafik Transaksi/grafikTransaksi";

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
    // const interval=setInterval(()=>{
    //   getLatestTransaction()
    //  },10000)
       
       
    //  return()=>clearInterval(interval)
  }, []);

  const getLatestTransaction = async (dataLatest) => {
    const decoded = jwtDecode(localStorage.token)
      const apiKey =decoded["api-key"]
      const headers = {
        'x-api-key': `${apiKey}`,
        'content-type': 'application/json',
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
      <Row className="container-dashboard4">
        <PieChart/>
      </Row>
      <Row  className="container-dashboard1">
        <PendapatanHarian latestTransaction={latestTransaction} setLatestTransaction={setLatestTransaction} />
        <PendapatanBulanan latestTransaction={latestTransaction} setLatestTransaction={setLatestTransaction} />
        <PendapatanTahunan latestTransaction={latestTransaction} setLatestTransaction={setLatestTransaction} />
        </Row>
      {/* </div> */}
      <Row className="container-dashboard2" type="flex" >
        <GrafikPendapatanBulan latestTransaction={latestTransaction} setLatestTransaction={setLatestTransaction} />
      </Row>
      <Row className="container-dashboard3">
        <JumlahTransaksiHarian latestTransaction={latestTransaction} setLatestTransaction={setLatestTransaction} />
        <JumlahTransaksiBulanan latestTransaction={latestTransaction} setLatestTransaction={setLatestTransaction} />
        <JumlahTransaksiTahunan latestTransaction={latestTransaction} setLatestTransaction={setLatestTransaction} />
        </Row>
        <Row className="container-dashboard2" type="flex" >
        <GrafikTransaksi latestTransaction={latestTransaction} setLatestTransaction={setLatestTransaction} />
      </Row>
      <Row className="container-dashboard5">
        <LatestTransaction style={{ margin: "0px", textAlign: "center" }} latestTransaction={latestTransaction} setLatestTransaction={setLatestTransaction} />
      </Row> 
    </div>
  );
};

export default SamplePage;
