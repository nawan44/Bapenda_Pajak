import React, { useState, useEffect } from "react";
import { Col, Row } from "antd";
import { Bar, BarChart, ResponsiveContainer, Tooltip } from "recharts";
import EcommerceStatus from "../../../components/Metrics/EcommerceStatus";
import * as moment from 'moment';
import { forkJoin, mergeMap } from 'rxjs';
// import "../../../assets/styles/flip-card.css"
import TotalEncomeCard from "../../../components/Metrics/TotalEncomeCard";
import Widget from "../../../components/Widget/index";
import "../../../assets/styles/card-transaction.css"



const CardTransaction = ({ color, latestTransaction, setLatestTransaction }) => {
    const now = moment().format('YYYY-MM-DD')
    const [moneyToday, setMoneyToday] = useState()

    const all_transaction = latestTransaction && latestTransaction.map(row => ({
        merchant_id: row[1].stringValue,
        total_value:Number( row[3].stringValue),
        nama_usaha: row[2].stringValue,
        created_at: moment(row[4].stringValue).format('YYYY-MM-DD')
    }));


    const objToday = all_transaction && all_transaction.filter(o => o.created_at === now)
    // .reduce((a, {merchant_id, total_value}) => 
    // (a[merchant_id] = (a[merchant_id] || 0) + +total_value, a), {});
    const result_all_transaction = all_transaction?.map((item, i, array) => {
      const defaultValue = {
        merchant_id: item.merchant_id,
        nama_usaha: item.nama_usaha,
        created_at: item.created_at,
        total_value: 0
      }
      const finalValue = array.filter(other => other.merchant_id === item.merchant_id) //we filter the same items
        .reduce((accum, currentVal) => { //we reduce them into a single entry
          accum.total_value += currentVal.total_value;
          return accum;
        }, defaultValue);
      return finalValue;
    })       

    .filter((item, thisIndex, array) => { //now our new array has duplicates, lets remove them
      const index = array.findIndex((otherItem, otherIndex) => otherItem.merchant_id === item.merchant_id && otherIndex !== thisIndex && otherIndex > thisIndex);
  
      return index === -1
    })
  
  console.log("result_all_transaction",result_all_transaction)
    // const currentToday = objToday && objToday.map(v => ({
    //     nama_usaha : v.nama_usaha,
    //     created_at : v.created_at,
    //     total_value:  Number(v.total_value).reduce((sum, current) => sum + current, 0)
    // }))
        

    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',

    });
    return (
        <>
            {result_all_transaction && result_all_transaction.map(row => (

                <Col className="row-transaction" xs={24} xl={8} >
                    <div className="card-transaction" >
                        <Widget styleName={`gx-card-full gx-bg-green`} >
                            <div className="gx-d-flex gx-px-4 gx-pt-4 gx-pb-2" >
                            
                            
                                {/*  <p className="gx-text-uppercase gx-chart-title">income last year</p>
            <p className="gx-ml-auto gx-text-primary">67% <i className="icon icon-menu-up gx-fs-sm" /></p> */}
                     
                     
                            </div>
                            <div className="gx-actchart gx-pb-5 gx-pl-4">
                                <h1 className=" gx-font-weight-medium gx-mb-4 gx-text-black" style={{ fontSize: "24px", fontWeight: "bold", transform: "scale(.9, 2)" }}>
                                {formatter.format(row.total_value)}
                                    </h1>
                                <p className="gx-mb-1 gx-pt-2">Bruto : Rp 25,000,000 </p>
                                <p className="gx-mb-1">NET :  Rp 24,500,000</p>
                                <p className="gx-mb-0 gx-text-black">{row.nama_usaha}</p>

                            </div>
                            <div className="gx-d-flex gx-px-4 gx-pt-2 gx-pb-1" style={{ backgroundColor: "white" }} >
                                <p className="gx-text-uppercase gx-chart-title">{row.created_at}</p>
                            </div>
                        </Widget>        </div>
                </Col>
            ))
            }
        </>
    );
};

export default CardTransaction;

