import React, { useState, useEffect } from "react";
import { Col, Row } from "antd";
import { Bar, BarChart, ResponsiveContainer, Tooltip } from "recharts";
import EcommerceStatus from "../../../components/Metrics/EcommerceStatus";
import * as moment from 'moment';
import "../../../assets/styles/flip-card.css"
import { geekblue,blue } from '@ant-design/colors';
import {ArrowUpOutlined,ArrowDownOutlined } from '@ant-design/icons';

// import toRupiah from '@develoka/angka-rupiah-js';


const PendapatanHariIni = ( props) => {

  const { latestTransaction, setLatestTransaction } = props
  const [loading, setloading] = useState(true);
  const [moneyToday, setMoneyToday] = useState()
  const [moneyYesterday, setMoneyYesterday] = useState()
// tanggal_transaksi
// nilai

  const token = localStorage.getItem('token')
  const now = moment().format('YYYY-MM-DD')
  const kemarin = moment().subtract(1, 'd').format('YYYY-MM-DD')

  const sToday = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss')
  const eToday = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss')
  const sYesterday = moment().subtract(1, 'd').startOf('day').format('YYYY-MM-DD HH:mm:ss')
  const eYesterday = moment().subtract(1, 'd').endOf('day').format('YYYY-MM-DD HH:mm:ss')

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


  // Tanggal 27 Total = 63.000
  // Tanggal 23 Total = 175.000
  // Tanggal 22 Total = 26.000.000
  // Total = 26.238.000
  // Total = 26.238.000



  // const length = latestTransaction && latestTransaction .map( v => v[3].stringValue).length()                                

  // console.log("length", latestTransaction && latestTransaction.length);

  // console.log("now", now);
  // console.log("ytanggal", tanggal);
  // console.log("kemarin", kemarin)

  const objToday = tanggal && tanggal.filter(o => o.created_at === now);
  // console.log("tanggal", tanggal);
  const currentToday = objToday && objToday.map(v => Number(v.total_value))
    .reduce((sum, current) => sum + current, 0)
  // console.log("currentVal", currentVal);
  const objYesterday = tanggal && tanggal.filter(o => o.created_at === kemarin);
  // console.log("obj", objToday);
  const currentYesterday = objYesterday && objYesterday.map(v => Number(v.total_value))
    .reduce((sum, current) => sum + current, 0)
  // console.log("currentToday", currentToday);
  // const formatRupiah =(aa)=>{
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    
      // These options are needed to round to whole numbers if that's what you want.
      //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
      //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });
    
    useEffect(() => {
      setMoneyToday(currentToday);
    }, [currentToday]);
    
    useEffect(() => {
      setMoneyYesterday(currentYesterday);
    }, [currentYesterday]);






  return (

      <Col className="flip-card"  xs={24} xl={8} >
        <div className="flip-card-inner" >
          <div className="flip-card-front" >
            <EcommerceStatus color="green"
  icon="revenue-new" title={<div style={{marginBottom:"35px"}}>{formatter.format(currentToday)}</div>} colorTitle="indigo" 
  moneyToday={moneyToday} setMoneyToday ={setMoneyToday} moneyYesterday={moneyYesterday}  setMoneyYesterday={setMoneyYesterday} objToday={objToday}
  subTitle={<div><span>Total Pendapatan</span><br /><span>(Hari Ini)</span></div>} colorSubTitle="indigo"  />
          </div>
          <div className="flip-card-back">
            <EcommerceStatus  icon="revenue-new" color="grey"  title={<div style={{marginBottom:"115px"}}>{formatter.format(currentYesterday)}</div>} colorTitle="dark" 
              // moneyToday={moneyToday} setMoneyToday ={setMoneyToday} moneyYesterday={moneyYesterday} setMoneyYesterday={setMoneyYesterday}
              subTitle={<div><span>Total Pendapatan</span><br /><span>(Kemarin)</span></div>} colorSubTitle="dark"/>
          </div>
        </div>
      </Col>
  );
};

export default PendapatanHariIni;

