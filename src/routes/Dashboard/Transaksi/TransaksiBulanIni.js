import React, { useState, useEffect } from "react";
import { Col } from "antd";
import EcommerceStatus from "../../../components/Metrics/EcommerceStatus";
import * as moment from 'moment';

const TransaksiBulanIni = (props) => {
  const { latestTransaction, setLatestTransaction } = props
  const [transactionThisMonth, setTransactionThisMonth] = useState()
  const [transactionLastMonth, setTransactionLastMonth] = useState()
  const bulanIni = moment().format('YYYY-MM')
  const bulanLalu =moment().subtract(1,'months').format('YYYY-MM')
  const bulan = latestTransaction && latestTransaction.map(row => ({
    total_value: row[3].stringValue,
    created_at:  moment(row[4].stringValue).format('YYYY-MM')
  }));

  const data = latestTransaction && latestTransaction.map(row => ({
    invoice_id: row[0].stringValue, 
    merchant_id: row[1].stringValue,
    nama_usaha : row[2].stringValue,
    total_value: row[3].stringValue, 
    created_at: row[4].stringValue
  }));
  const objTransactionThisMonth = bulan && bulan.filter(o => o.created_at === bulanIni);

  const transaksiBulanIni = objTransactionThisMonth?.length
  const objTransactionLastMonth = bulan && bulan.filter(o => o.created_at === bulanLalu);
  const transaksiBulanLalu = objTransactionLastMonth?.length

  useEffect(() => {
    setTransactionThisMonth(transaksiBulanIni);
  }, [transaksiBulanIni]);
  
  useEffect(() => {
    setTransactionLastMonth(transaksiBulanLalu);
  }, [transaksiBulanLalu]);


  return (
   
    <Col className="flip-card"  xs={24} xl={8} >
    <div className="flip-card-inner" >
          <div className="flip-card-front" >
          <EcommerceStatus color="yellow"
  icon="orders" title={<div style={{marginBottom:"35px"}}>{transaksiBulanIni}</div>} colorTitle="indigo" 
  transactionThisMonth={transactionThisMonth} setTransactionThisMonth ={setTransactionThisMonth} transactionLastMonth={transactionLastMonth}  setTransactionLastMonth={setTransactionLastMonth} objTransactionThisMonth={objTransactionThisMonth}
  subTitle={<div><span>Total Transaksi</span><br /><span>(Bulan Ini)</span></div>} colorSubTitle="indigo"  />

{/* <EcommerceStatus color="orange" icon="orders" title="4" colorTitle="geekblue"
                     subTitle="Total Transaksi (Hari Ini)" colorSubTitle="geekblue"/> */}
          </div>
          <div class="flip-card-back">
            <EcommerceStatus  icon="orders" color="grey"  title={<div style={{marginBottom:"115px"}}>{transaksiBulanLalu}</div>} colorTitle="dark" 
              subTitle={<div><span>Total Transaksi</span><br /><span>(Bulan Lalu)</span></div>} colorSubTitle="dark"/>
        </div>
        </div>
      </Col>
  );
};

export default TransaksiBulanIni;

