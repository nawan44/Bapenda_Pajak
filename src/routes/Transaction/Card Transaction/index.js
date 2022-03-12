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
import 'moment/locale/id'



const CardTransaction = ({stateWarna, setStateWarna, color, latestTransaction, setLatestTransaction,title, subTitle,result_all_transaction }) => {
  const now = moment().format('YYYY-MM-DD')
  const [moneyToday, setMoneyToday] = useState()


  const warna = (aa) => {

    if (aa === 0) {
      return "green"
    } else if (aa === 1) {
      return "orange"

    } else if (aa === 2) {
      return "red"

    } else if (aa >= 10) {
      return "dark"
    } else {
      return "grey"
    }
  }
  const colorText = (aa) => {
    if (aa === 0) {
      return "dark"
    } else if (aa === 1) {
      return "dark"

    } else if (aa === 2) {
      return "dark"

    } else if (aa >= 10) {
      return "white"
    } else {
      return "dark"
    }
  }

    const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',

  });
  return (
    <>
      {result_all_transaction && result_all_transaction.map(row => (

        <Col className="row-transaction" xs={24} xl={8} >
          <div className="card-transaction" >
            <Widget styleName={`gx-card-full gx-bg-${warna(moment(now).diff(moment(row.created_at), 'days'))}`} >
              <div className="gx-d-flex gx-px-4 gx-pt-4 gx-pb-2" >

              </div>
              <div className="gx-actchart gx-pb-5 gx-pl-4">
                <h1 styleName={`gx-font-weight-medium gx-mb-4 gx-text-black gx-text-${colorText(moment(now).diff(moment(row.created_at), 'days'))}` }
                style={{ fontSize: "24px", fontWeight: "bold", transform: "scale(.9, 2)" }} >
                  {formatter.format(row.total_value)}
                </h1>
                <p className="gx-mb-1 gx-pt-2">Bruto : Rp 25,000,000 </p>
                {/* <p className="gx-mb-1">{}</p> */}
                <p styleName={`gx-mb-0 gx-text-black gx-text-${colorText(moment(now).diff(moment(row.created_at), 'days'))}`}>{row.nama_usaha}</p>

              </div>
              <div className="gx-d-flex gx-px-4 gx-pt-2 gx-pb-1" style={{ backgroundColor: "white" }} >
                <p className="gx-text-uppercase gx-chart-title">{moment(row.created_at).format('YYYY-MM-DD')}</p>
                {/* </div>
                                <div className="gx-d-flex gx-px-4 gx-pt-2 gx-pb-1" style={{ backgroundColor: "white" }} > */}

                <p className="gx-text-uppercase gx-chart-title">  - {moment(row.created_at).fromNow()}</p>

              </div>
            </Widget>        </div>
        </Col>
      ))
      }
    </>
  );
};

export default CardTransaction;

