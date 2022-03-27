import React, { useState, useEffect } from "react";
import { Col } from "antd";
import EcommerceStatus from "../../../components/Metrics/EcommerceStatus";
import * as moment from "moment";
import "../../../assets/styles/flip-card.css";

const PendapatanTahunan = (props) => {
  const { latestTransaction, setLatestTransaction, getLatestTransaction } =
    props;
  const tahunIni = moment().format("YYYY");
  const tahunLalu = moment().subtract(1, "years").format("YYYY");

  const [moneyThisYear, setMoneyThisYear] = useState();
  const [moneyLastYear, setMoneyLastYear] = useState();

  const tahun =
    latestTransaction &&
    latestTransaction.map((row) => ({
      total_value: row[3].stringValue,
      created_at: moment(row[4].stringValue).format("YYYY"),
    }));
  const objTahunIni = tahun && tahun.filter((o) => o.created_at === tahunIni);
  const currentTahunIni =
    objTahunIni &&
    objTahunIni
      .map((v) => Number(v.total_value))
      .reduce((sum, current) => sum + current, 0);

  const objTahunLalu = tahun && tahun.filter((o) => o.created_at === tahunLalu);
  const currentTahunLalu =
    objTahunLalu &&
    objTahunLalu
      .map((v) => Number(v.total_value))
      .reduce((sum, current) => sum + current, 0);

  useEffect(() => {
    setMoneyThisYear(currentTahunIni === undefined ? 0 : currentTahunIni);
  }, [currentTahunIni]);

  useEffect(() => {
    setMoneyLastYear(currentTahunLalu === undefined ? 0 : currentTahunLalu);
  }, [currentTahunLalu]);
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });
  return (
    <Col className="flip-card" xs={24} xl={8}>
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <EcommerceStatus
            color="white"
            icon="revenue-new"
            title={
              <div className="title-card-dashboard">
                {currentTahunIni === undefined
                  ? formatter.format(0)
                  : formatter.format(currentTahunIni)}
              </div>
            }
            colorTitle="primary"
            moneyThisYear={moneyThisYear}
            setMoneyThisYear={setMoneyThisYear}
            moneyLastYear={moneyLastYear}
            setMoneyLastYear={setMoneyLastYear}
            objTahunIni={objTahunIni}
            subTitle={
              <div  className="subtitle-card-dashboard">
                <span>Total Pendapatan</span>
                <br />
                <span>(Tahun Ini)</span>
              </div>
            }
            colorSubTitle="primary"
          />
        </div>
        <div class="flip-card-back">
          <EcommerceStatus
            icon="revenue-new"
            color="grey"
            title={
              <div  className="subtitle-card-dashboard-grey">
                {currentTahunLalu === undefined
                  ? formatter.format(0)
                  : formatter.format(currentTahunLalu)}
              </div>
            }
            colorTitle="dark"
            // moneyToday={moneyToday} setMoneyToday ={setMoneyToday} moneyYesterday={moneyYesterday} setMoneyYesterday={setMoneyYesterday}
            subTitle={
              <div  className="subtitle-card-dashboard">
                <span>Total Pendapatan</span>
                <br />
                <span>(Tahun Lalu)</span>
              </div>
            }
            colorSubTitle="dark"
          />
        </div>
      </div>
    </Col>
  );
};

export default PendapatanTahunan;
