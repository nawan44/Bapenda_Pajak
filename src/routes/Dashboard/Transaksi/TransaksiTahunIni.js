import React, { useState, useEffect } from "react";
import { Col, Row } from "antd";
import { Bar, BarChart, ResponsiveContainer, Tooltip } from "recharts";
import EcommerceStatus from "../../../components/Metrics/EcommerceStatus";
import * as moment from 'moment';

const TransaksiTahunIni = (props) => {
  const { latestTransaction, setLatestTransaction } = props
  const [transactionThisYear, setTransactionThisYear] = useState()
  const [transactionLastYear, setTransactionLastYear] = useState()

  const tahunIni = moment().format('YYYY')
  const tahunLalu =moment().subtract(1,'years').format('YYYY')  
  const tahun = latestTransaction && latestTransaction.map(row => ({
    total_value: row[3].stringValue,
    created_at:  moment(row[4].stringValue).format('YYYY')
  }));

  const data = latestTransaction && latestTransaction.map(row => ({
    invoice_id: row[0].stringValue, 
    merchant_id: row[1].stringValue,
    nama_usaha : row[2].stringValue,
    total_value: row[3].stringValue, 
    created_at: row[4].stringValue
  }));
  const objTransactionThisYear = tahun && tahun.filter(o => o.created_at === tahunIni);

// const transaksiTahunIni =5
// const transaksiTahunLalu=5
  const transaksiTahunIni = objTransactionThisYear?.length
  
  // console.log("objTransactionThisYear", objTransactionThisYear.length)
  const objTransactionLastYear = tahun && tahun.filter(o => o.created_at === tahunLalu);
  
   const transaksiTahunLalu = objTransactionLastYear?.length
// 

  useEffect(() => {
    setTransactionThisYear(transaksiTahunIni);
  }, [transaksiTahunIni]);
  
  useEffect(() => {
    setTransactionLastYear(transaksiTahunLalu);
  }, [transaksiTahunLalu]);


  return (
   
    <Col className="flip-card"  xs={24} xl={8} >
    <div className="flip-card-inner" >
          <div className="flip-card-front" >
          <EcommerceStatus color="white"
  icon="orders" title={<div style={{marginBottom:"35px"}}>{transaksiTahunIni}</div>} colorTitle="primary" 
  transactionThisYear={transactionThisYear} setTransactionThisYear ={setTransactionThisYear} transactionLastYear={transactionLastYear}  setTransactionLastYear={setTransactionLastYear} objTransactionThisYear={objTransactionThisYear}
  subTitle={<div><span>Total Transaksi</span><br /><span>(Tahun Ini)</span></div>} colorSubTitle="primary"  />

{/* <EcommerceStatus color="orange" icon="orders" title="4" colorTitle="geekblue"
                     subTitle="Total Transaksi (Hari Ini)" colorSubTitle="geekblue"/> */}
          </div>
          <div class="flip-card-back">
            <EcommerceStatus  icon="orders" color="grey"  title={<div style={{marginBottom:"115px"}}>{transaksiTahunLalu}</div>} colorTitle="dark" 
             subTitle={<div><span>Total Transaksi</span><br /><span>(Tahun Lalu)</span></div>} colorSubTitle="dark"/>
        </div>
        </div>
      </Col>
  );
};

export default TransaksiTahunIni;

