import React, { useState, useEffect } from "react";
import { Col, Row } from "antd";
import IntlMessages from "util/IntlMessages";
import TransaksiHariIni from "./Transaksi/TransaksiHariIni";
import TransaksiBulanIni from "./Transaksi/TransaksiBulanIni";
import TransaksiTahunIni from "./Transaksi/TransaksiTahunIni";

// import { Area, AreaChart, ResponsiveContainer, Tooltip } from "rechart";
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
  //   [
  //     {
  //       "stringValue": "af24d9ff-992b-11ec-b795-b3fa3cd6d8cb"
  //     },
  //     {
  //       "stringValue": "2021-08-21 13:45:02"
  //     },
  //     {
  //       "stringValue": "DEJARDIN0001"
  //     },
  //     {
  //       "stringValue": "278600.00"
  //     }
  //   ],
   
  //   [
  //     {
  //       "stringValue": "5bda50ab-9940-11ec-8a2c-a97e6ec00a1c"
  //     },
  //     {
  //       "stringValue": "2022-01-02 16:14:00"
  //     },
  //     {
  //       "stringValue": "DEJARDIN0001"
  //     },
  //     {
  //       "stringValue": "9650.00"
  //     }
  //   ],
  //   [
  //     {
  //       "stringValue": "5bda50ab-9940-11ec-8a2c-a97e6ec00a1c"
  //     },
  //     {
  //       "stringValue": "2022-01-02 16:14:00"
  //     },
  //     {
  //       "stringValue": "DEJARDIN0001"
  //     },
  //     {
  //       "stringValue": "54650.00"
  //     }
  //   ],
  //   [
  //     {
  //       "stringValue": "66371b5c-993e-11ec-8a29-39f9bbacf68b"
  //     },
  //     {
  //       "stringValue": "2022-03-01 15:59:32"
  //     },
  //     {
  //       "stringValue": "DEJARDIN0001"
  //     },
  //     {
  //       "stringValue": "78650.00"
  //     }
  //   ],
  //   [
  //     {
  //       "stringValue": "89f44d2a-993e-11ec-9045-39f9bbacf68b"
  //     },
  //     {
  //       "stringValue": "2022-03-01 15:59:32"
  //     },
  //     {
  //       "stringValue": "DEJARDIN0001"
  //     },
  //     {
  //       "stringValue": "78650.00"
  //     }
  //   ],
  //   [
  //     {
  //       "stringValue": "5bda50ab-9940-11ec-8a2c-a97e6ec00a1c"
  //     },
  //     {
  //       "stringValue": "2022-03-02 16:14:00"
  //     },
  //     {
  //       "stringValue": "DEJARDIN0001"
  //     },
  //     {
  //       "stringValue": "34650.00"
  //     }
  //   ],
  //   [
  //     {
  //       "stringValue": "d14a39f5-993e-11ec-b24f-39f9bbacf68b"
  //     },
  //     {
  //       "stringValue": "2022-03-01 15:59:32"
  //     },
  //     {
  //       "stringValue": "DEJARDIN0001"
  //     },
  //     {
  //       "stringValue": "78650.00"
  //     }
  //   ],
  //   [
  //     {
  //       "stringValue": "7eb59aa1-9940-11ec-87f6-a97e6ec00a1c"
  //     },
  //     {
  //       "stringValue": "2022-03-01 15:59:32"
  //     },
  //     {
  //       "stringValue": "DEJARDIN0001"
  //     },
  //     {
  //       "stringValue": "78650.00"
  //     }
  //   ],
  //   [
  //     {
  //       "stringValue": "26666038-9943-11ec-9b3b-55c30375ce7c"
  //     },
  //     {
  //       "stringValue": "2022-02-27 15:58:45"
  //     },
  //     {
  //       "stringValue": "DEJARDIN0001"
  //     },
  //     {
  //       "stringValue": "78650.00"
  //     }
  //   ],
  //   [
  //     {
  //       "stringValue": "af24d9ff-992b-11ec-b795-b3fa3cd6d8cb"
  //     },
  //     {
  //       "stringValue": "2022-02-28 13:45:02"
  //     },
  //     {
  //       "stringValue": "DEJARDIN0001"
  //     },
  //     {
  //       "stringValue": "98650.00"
  //     }
  //   ],

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
