import { Col, Row } from "antd";
import React from "react";
import GrafikPendapatan from "./Grafik Pendapatan";
import GrafikTransaksi from "./Grafik Transaksi";

function BarTransaksiPendapatan() {
  return (
    <Row  className="container-dashboard4">
      {/* <Col xs={24} xl={12}span={12}> */}
      <Col xs={24} xl={12} span={6} > 
        <GrafikPendapatan  />
      </Col>
      <Col xs={24} xl={12} span={6} >
        <GrafikTransaksi />
      </Col>
    </Row>
  );
}

export default BarTransaksiPendapatan;
