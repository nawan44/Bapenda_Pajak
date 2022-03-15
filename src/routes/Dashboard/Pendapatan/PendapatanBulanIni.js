import React, { useState, useEffect } from "react";
import { Col } from "antd";
import EcommerceStatus from "../../../components/Metrics/EcommerceStatus";
import * as moment from 'moment';
import "../../../assets/styles/flip-card.css"

const PendapatanBulanIni = (props) => {
  const {latestTransaction, setLatestTransactio} = props
  const bulanIni = moment().format('YYYY-MM')
  const bulanLalu =moment().subtract(1,'months').format('YYYY-MM')

  const [moneyThisMonth, setMoneyThisMonth] = useState()
  const [moneyLastMonth, setMoneyLastMonth] = useState()

  const bulan = latestTransaction && latestTransaction.map(row => ({
    total_value: row[3].stringValue,
    created_at:  moment(row[4].stringValue).format('YYYY-MM')
  }));
  const objBulanIni = bulan && bulan.filter(o => o.created_at === bulanIni);
  const currentBulanIni = objBulanIni && objBulanIni.map(v => Number(v.total_value))
    .reduce((sum, current) => sum + current, 0)

    const objBulanLalu = bulan && bulan.filter(o => o.created_at === bulanLalu);
    const currentBulanLalu = objBulanLalu && objBulanLalu.map(v => Number(v.total_value))
      .reduce((sum, current) => sum + current, 0)    


  useEffect(() => {
    setMoneyThisMonth(currentBulanIni);
  }, [currentBulanIni]);
  
  useEffect(() => {
    setMoneyLastMonth(currentBulanLalu);
  }, [currentBulanLalu]);
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  return (
   
    <Col className="flip-card" xs={24} xl={8} >
    <div className="flip-card-inner" >
          <div className="flip-card-front" >
          <EcommerceStatus color="teal" 
  icon="revenue-new" title={<div style={{marginBottom:"35px"}}>{formatter.format(currentBulanIni)}</div>} colorTitle="geekblue" 
  moneyThisMonth={moneyThisMonth} setMoneyThisMonth ={setMoneyThisMonth} moneyLastMonth={moneyLastMonth}  setMoneyLastMonth={setMoneyLastMonth} objBulanIni={objBulanIni}
  subTitle={<div><span>Total Pendapatan</span><br /><span>(Bulan Ini)</span></div>} colorSubTitle="geekblue"  />
          </div>
          <div class="flip-card-back">
            <EcommerceStatus  icon="revenue-new" color="grey" title={<div style={{marginBottom:"115px"}}>{formatter.format(currentBulanLalu)}</div>} colorTitle="dark" 
              // moneyToday={moneyToday} setMoneyToday ={setMoneyToday} moneyYesterday={moneyYesterday} setMoneyYesterday={setMoneyYesterday}
              subTitle={<div><span>Total Pendapatan</span><br /><span>(Bulan Lalu)</span></div>} colorSubTitle="dark"/>
        </div>
        </div>
      </Col>
  );
};

export default PendapatanBulanIni;

