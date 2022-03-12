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
import WelComeCard from "../../../components/dashboard/CRM/WelComeCard";
import SiteAudience from "../../../components/dashboard/CRM/SiteAudience";
// import SiteVisit from "../../../components/dashboard/CRM/SiteVisit";



const HeaderTransaction = ({ color, latestTransaction, setLatestTransaction,result_all_transaction }) => {

  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',

  });
  return (
    <Row>
        <Col span={12}  >
          <WelComeCard result_all_transaction={result_all_transaction} />
        </Col>
        <Col span={12}>
          <SiteAudience result_all_transaction={result_all_transaction} />
        </Col>
      {/* <Row>
      <Col span={24}>

        <SiteVisit/>
      </Col>
    </Row> */}
    </Row>
  );
};

export default HeaderTransaction;

