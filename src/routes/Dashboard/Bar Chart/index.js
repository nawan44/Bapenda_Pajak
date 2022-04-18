import { Col, Row } from "antd";
import React from "react";
import GrafikPendapatan from "./Grafik Pendapatan";
import GrafikTransaksi from "./Grafik Transaksi";

function BarTransaksiPendapatan() {
  return (
    <>
      {/* <Col xs={24} xl={12}span={12}> */}
      <Col xl={12} style={{margin:"0 auto", textAlign:"center", padding:"5px"}}  > 
        <GrafikPendapatan  />
      </Col>
      <Col  xl={12}  style={{margin:"0 auto", textAlign:"center", padding:"5px"}}   >
        <GrafikTransaksi />
      </Col>
    </>
  );
}

export default BarTransaksiPendapatan;
