import React from "react";
import { Col, Row } from "antd";
import "../../../../assets/styles/card-status-device.css"
import WelComeCard from "../../../../components/dashboard/CRM/WelComeCard";
import SiteAudience from "../../../../components/dashboard/CRM/SiteAudience";
// import SiteVisit from "../../../components/dashboard/CRM/SiteVisit";



const HeaderStatusDevice = ({ color, latestTransaction, setLatestTransaction,data }) => {

  return (
    <Row>
        <Col span={12}  >
          <WelComeCard data={data} />
        </Col>
        <Col span={12}>
          <SiteAudience data={data} />
        </Col>
      {/* <Row>
      <Col span={24}>

        <SiteVisit/>
      </Col>
    </Row> */}
    </Row>
  );
};

export default HeaderStatusDevice;

