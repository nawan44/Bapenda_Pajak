import React from "react";
import Widget from "components/Widget/index";
// import { trafficData } from "./metricsData"
import "../../assets/styles/card-status-device.css"



const TotalEncomeCard = ({ color,latestTransaction, setLatestTransaction }) => {
  // const {latestTransaction, setLatestTransaction} = props
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  
  });
  return (
    <>
   { latestTransaction && latestTransaction.map(row => (
    <Widget styleName={`gx-card-full gx-bg-${color}`} >
          <div className="gx-d-flex gx-px-4 gx-pt-4 gx-pb-2" >
           {/*  <p className="gx-text-uppercase gx-chart-title">income last year</p>
            <p className="gx-ml-auto gx-text-primary">67% <i className="icon icon-menu-up gx-fs-sm" /></p> */}
          </div>
          <div className="gx-actchart gx-pb-5 gx-pl-4">
            <h1 className=" gx-font-weight-medium gx-mb-4 gx-text-black" style={{fontSize:"24px", fontWeight:"bold", transform: "scale(.9, 2)"}}>{formatter.format(row[3].stringValue) }</h1>
            <p className="gx-mb-1 gx-pt-2">Bruto : Rp 25,000,000 </p>
            <p className="gx-mb-1">NET :  Rp 24,500,000</p>
            <p className="gx-mb-0 gx-text-black">{row[2].stringValue}</p>

          </div>
          <div className="gx-d-flex gx-px-4 gx-pt-2 gx-pb-1" style={{backgroundColor:"white"}} >
            <p className="gx-text-uppercase gx-chart-title">{row[4].stringValue}</p>
          </div>
    </Widget>
            ))
}
    </>
  );
};

export default TotalEncomeCard;
