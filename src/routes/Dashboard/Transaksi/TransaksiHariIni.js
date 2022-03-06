import React, { useState, useEffect } from "react";
import { Col, Row } from "antd";
import { Bar, BarChart, ResponsiveContainer, Tooltip } from "recharts";
import EcommerceStatus from "../../../components/Metrics/EcommerceStatus";
import * as moment from 'moment';

const TransaksiHariIni = (props) => {
  const { latestTransaction, setLatestTransaction } = props
  const [transactionToday, setTransactionToday] = useState()
  const [transactionYesterday, setTransactionYesterday] = useState()


  const now = moment().format('YYYY-MM-DD')
  const kemarin = moment().subtract(1, 'd').format('YYYY-MM-DD')
  const tanggal = latestTransaction && latestTransaction.map(row => ({
    total_value: row[3].stringValue,
    created_at:  moment(row[4].stringValue).format('YYYY-MM-DD')
  }));

  const data = latestTransaction && latestTransaction.map(row => ({
    invoice_id: row[0].stringValue, 
    merchant_id: row[1].stringValue,
    nama_usaha : row[2].stringValue,
    total_value: row[3].stringValue, 
    created_at: row[4].stringValue
  }));
  const objTransactionToday = tanggal && tanggal.filter(o => o.created_at === now);


  const transaksiHariIni = objTransactionToday?.length
  const objTransactionYesterday = tanggal && tanggal.filter(o => o.created_at === kemarin);
  const transaksiKemarin = objTransactionYesterday?.length

 

  useEffect(() => {
    setTransactionToday(transaksiHariIni);
  }, [transaksiHariIni]);
  
  useEffect(() => {
    setTransactionYesterday(transaksiKemarin);
  }, [transaksiKemarin]);


  return (
   
    <Col className="flip-card"  xs={24} xl={8} >
    <div className="flip-card-inner" >
          <div className="flip-card-front" >
          <EcommerceStatus color="orange"
  icon="orders" title={<div style={{marginBottom:"35px"}}>{transaksiHariIni}</div>} colorTitle="geekblue" 
  transactionToday={transactionToday} setTransactionToday ={setTransactionToday} transactionYesterday={transactionYesterday}  setTransactionYesterday={setTransactionYesterday} objTransactionToday={objTransactionToday}
  subTitle={<div><span>Total Transaksi</span><br /><span>(Hari Ini)</span></div>} colorSubTitle="geekblue"  />

{/* <EcommerceStatus color="orange" icon="orders" title="4" colorTitle="geekblue"
                     subTitle="Total Transaksi (Hari Ini)" colorSubTitle="geekblue"/> */}
          </div>
          <div class="flip-card-back">
            <EcommerceStatus  icon="orders" color="grey"  title={<div style={{marginBottom:"115px"}}>{transaksiKemarin}</div>} colorTitle="dark" 
              // moneyToday={moneyToday} setMoneyToday ={setMoneyToday} moneyYesterday={moneyYesterday} setMoneyYesterday={setMoneyYesterday}
              subTitle={<div><span>Total Transaksi</span><br /><span>(Kemarin)</span></div>} colorSubTitle="dark"/>
        </div>
        </div>
      </Col>
  );
};

export default TransaksiHariIni;

