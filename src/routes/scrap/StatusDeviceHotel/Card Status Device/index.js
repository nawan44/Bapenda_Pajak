import React, { useState } from "react";
import { Col } from "antd";
import * as moment from 'moment';
// import { forkJoin, mergeMap } from 'rxjs';
import Widget from "../../../components/Widget/index";
import "../../../assets/styles/card-status-device.css"
import 'moment/locale/id'



const CardStatusDevice = ({filteredPolls, setfilteredPolls, stateWarna, setStateWarna, color, latestTransaction, setLatestTransaction,title, subTitle,result_all_status_device }) => {
  const now = moment().format('YYYY-MM-DD')
  const [moneyToday, setMoneyToday] = useState()


  const warna = (aa) => {

    if (aa === 0) {
      return "green"
    } else if (aa === 1) {
      return "orange"

    } else if (aa === 2) {
      return "red"

    } else if (aa >= 3) {
      return "dark"
    } else if (aa <= 0){
      return "grey"
    }
    else {
      return "white"
    }
  }
  const colorText = (aa) => {
    if (aa === 0) {
      return "dark"
    } else if (aa === 1) {
      return "dark"

    } else if (aa === 2) {
      return "dark"

    } else if (aa >= 3) {
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
      {result_all_status_device && result_all_status_device.map(row => (

        <Col span={8} xs={24} xl={8} >
          {/* <div className="card-status-device" > */}
            <Widget styleName={`gx-card-full gx-bg-${warna(moment(now).diff(moment(row.created_at), 'days'))}`} >
              <div className="gx-d-flex gx-px-4 gx-pt-4 gx-pb-2" >

              </div>
              <div className="gx-actchart gx-pb-5 gx-pl-4">
                <h1 styleName={`gx-font-weight-medium gx-mb-4 gx-text-black gx-text-${colorText(moment(now).diff(moment(row.created_at), 'days'))}` }
                className="currency">
                  {formatter.format(row.total_value.toFixed(0))}
                </h1>
                <p className="gx-mb-1 gx-pt-2">Bruto : Rp 25,000,000 </p>
                {/* <p className="gx-mb-1">{}</p> */}
                <p styleName={`gx-mb-0 gx-text-black gx-text-${colorText(moment(now).diff(moment(row.created_at), 'days'))}`}>{row.nama_usaha}</p>

              </div>
              <div className="gx-px-4 gx-pt-2 gx-pb-1" 
              style={{ backgroundColor: "white",height:"50px" }} >
                <div style={{width:"100%",float:"left"}} 
                className="gx-text-uppercase gx-chart-title">
                  {moment(row.created_at).format('YYYY-MM-DD')}</div>
                {/* </div>
                                <div className="gx-d-flex gx-px-4 gx-pt-2 gx-pb-1" style={{ backgroundColor: "white" }} > */}
              
                <div style={{width:"100%",float:"left"}} 
                className="gx-text-uppercase gx-chart-title"> 
                {moment(row.created_at).fromNow()}</div>

              </div>
            </Widget>        
            {/* // </div> */}
        </Col>
      ))
      }
    </>
  );
};

export default CardStatusDevice;

