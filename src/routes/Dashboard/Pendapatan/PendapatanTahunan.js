import React, { useState, useEffect } from "react";
import { Col } from "antd";
import EcommerceStatus from "../../../components/Metrics/EcommerceStatus";
import * as moment from "moment";
import "../../../assets/styles/flip-card.css";
import jwtDecode from "jwt-decode";

const PendapatanTahunan = (props) => {
  const { 
    // latestTransaction, setLatestTransaction, getLatestTransaction 
  } =    props;

  const [moneyThisYear, setMoneyThisYear] = useState();
  const [moneyLastYear, setMoneyLastYear] = useState();
  const [earningThisYear, setEarningThisYear] = useState(0);
  const [earningLastYear, setEarningLastYear] = useState(0);
  
  const [taxThisYear, setTaxThisYear] = useState(0);
  const [taxLastYear, setTaxLastYear] = useState(0);

  const [nettThisYear, setNettThisYear] = useState(0);
  const [nettLastYear, setNettLastYear] = useState(0);

 
  // Hotel
  // const [earningThisYear1, setEarningThisYear1] = useState(0);
  // //Parkir
  // const [earningThisYear2, setEarningThisYear2] = useState(0);
  // //Restoran
  // const [earningThisYear3, setEarningThisYear3] = useState(0);

  // // Hotel
  // const [earningLastYear1, setEarningLastYear1] = useState(0);
  // //Parkir
  // const [earningLastYear2, setEarningLastYear2] = useState(0);
  // //Restoran
  // const [earningLastYear3, setEarningLastYear3] = useState(0);


  const sThisYear = moment().startOf("year").format("YYYY-MM-DD HH:mm:ss");
  const eThisYear = moment().endOf("year").format("YYYY-MM-DD HH:mm:ss");
  const sLastYear = moment()
    .subtract(1, "year")
    .startOf("year")
    .format("YYYY-MM-DD HH:mm:ss");
  const eLastYear = moment()
    .subtract(1, "year")
    .endOf("year")
    .format("YYYY-MM-DD HH:mm:ss");

  useEffect(() => {
    getEarningThisYear();
  }, []);

  const getEarningThisYear = async () => {
    const decoded = jwtDecode(localStorage.token);
    const apiKey = decoded["api-key"];

    const response = await fetch(
      "https://api.raspi-geek.com/v1/values",

      {
        method: "POST",
        headers: {
          "x-api-key": `${apiKey}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          startdate: sThisYear,
          enddate: eThisYear,
        }),
      }
    );
    const res = await response.json();

    setEarningThisYear(res.Records[0][0].stringValue);
    setTaxThisYear(res.Records[0][1].stringValue);
    setNettThisYear(res.Records[0][2].stringValue);

    // setEarningThisYear2(res.Records[1][1].stringValue);
    // setEarningThisYear3(res.Records[2][1].stringValue);
  };

  useEffect(() => {
    getEarningLastYear();
  }, []);

  const getEarningLastYear = async () => {
    const decoded = jwtDecode(localStorage.token);
    const apiKey = decoded["api-key"];

    const response = await fetch(
      "https://api.raspi-geek.com/v1/values",
      {
        method: "POST",
        headers: {
          "x-api-key": `${apiKey}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          startdate: sLastYear,
          enddate: eLastYear,
        }),
      }
    );
    const res = await response.json();
    setEarningLastYear(res.Records[0][0].stringValue);
    setTaxLastYear(res.Records[0][1].stringValue);
    setNettLastYear(res.Records[0][2].stringValue);

    // setEarningLastYear2(res.Records[1][1].stringValue);
    // setEarningLastYear3(res.Records[2][1].stringValue);
  };

  // const earningLastYear =
  //   Number(earningLastYear1) +
  //   Number(earningLastYear2) +
  //   Number(earningLastYear3);

  // const earningThisYear =
  //   Number(earningThisYear1) +
  //   Number(earningThisYear2) +
  //   Number(earningThisYear3);

  
  useEffect(() => {
    setMoneyThisYear(earningThisYear === undefined ? 0 : Number(earningThisYear));
  }, [earningThisYear]);

  useEffect(() => {
    setMoneyLastYear(earningLastYear  === undefined ? 0 : Number(earningLastYear));
  }, [earningLastYear]);


  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  return (
    <Col className="flip-card" xs={24} xl={8}>
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <EcommerceStatus
            color="white"
            icon="revenue-new"
            title={
              <div className="title-card-dashboard" 
              >
             Tahun Ini
              </div>
            }
            colorTitle="primary"
            moneyThisYear={moneyThisYear}
            setMoneyThisYear={setMoneyThisYear}
            moneyLastYear={moneyLastYear}
            setMoneyLastYear={setMoneyLastYear}
            subTitle={
              <div className="subtitle-card-dashboard">
               <p>        
               <span style={{ fontWeight: "bold" }}>
                 {taxThisYear === undefined
                  ? formatter.format(0)
                  : formatter.format(taxThisYear)}</span>          
                  <br/>
                    <span>(Total Tax)</span>
                </p>
                <p>
                  <span style={{fontWeight:"bold"}}> {formatter.format(earningThisYear)}</span>
                  <br/>
                  <span>(Total Pendapatan)</span>
                </p>
                <p>
                  <span style={{fontWeight:"bold"}}>  {formatter.format(nettThisYear)}</span>
                  <br/>
                  <span>(Total Nett)</span>
                </p>
              </div>
            }
            colorSubTitle="primary"
          />
        </div>
        <div className="flip-card-back">
          <EcommerceStatus
            icon="revenue-new"
            color="grey"
            title={
              <div className="subtitle-card-dashboard-grey">
               Tahun Lalu
              </div>
            }
            colorTitle="dark"
            subTitle={
              <div className="subtitle-card-dashboard">
                  <p>
                  <span style={{ fontWeight: "bold" }}>
                    {taxLastYear === undefined
                  ? formatter.format(0)
                  : formatter.format(taxLastYear)}
                    </span>
                    <br/>
                  <span>(Total Tax)</span>
                  {/* <br />
                  <span>(Tahun Lalu)</span> */}
                </p>
                <p>
                  <span> {formatter.format(earningLastYear)}</span>
                  <br/>

                  <span>(Tax Pendapatan)</span>
                </p>
                <p>
                  <span> {formatter.format(nettLastYear)}</span>
                  <br/>
                  <span>(Total Nett)</span>
                </p>
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
