import React, { useState, useEffect } from "react";
import { Col } from "antd";
import EcommerceStatus from "../../../components/Metrics/EcommerceStatus";
import * as moment from "moment";
import "../../../assets/styles/flip-card.css";
import { latestTransaction1 } from "../../../components/DataDummy";
import jwtDecode from "jwt-decode";

const PendapatanBulanan = (props) => {
  // const {latestTransaction, setLatestTransactio} = props

  const latestTransaction = latestTransaction1.data;

  const [earningThisMonth, setEarningThisMonth] = useState();

  const [earningThisMonthRestoran, setEarningThisMonthRestoran] = useState(0);
  const [earningThisMonthHotel, setEarningThisMonthHotel] = useState(0);
  const [earningThisMonthParkir, setEarningThisMonthParkir] = useState(0);

  const [earningLastMonth, setEarningLastMonth] = useState();

  const [earningLastMonthRestoran, setEarningLastMonthRestoran] = useState(0);
  const [earningLastMonthHotel, setEarningLastMonthHotel] = useState(0);
  const [earningLastMonthParkir, setEarningLastMonthParkir] = useState(0);

  console.log("earning This Restoran", earningThisMonthRestoran);
  console.log("earning This Hotel", earningThisMonthHotel);
  console.log("earning This Parkir", earningThisMonthParkir);

  const bulanIni = moment().format("YYYY-MM");
  const bulanLalu = moment().subtract(1, "months").format("YYYY-MM");

  const sThisMonth = moment().startOf("month").format("YYYY-MM-DD HH:mm:ss");
  const eThisMonth = moment().endOf("month").format("YYYY-MM-DD HH:mm:ss");
  const sLastMonth = moment()
    .subtract(1, "month")
    .startOf("month")
    .format("YYYY-MM-DD HH:mm:ss");
  const eLastMonth = moment()
    .subtract(1, "month")
    .endOf("month")
    .format("YYYY-MM-DD HH:mm:ss");

  // console.log("sThisMonth", sThisMonth)
  // console.log("eThisMonth", eThisMonth)
  // console.log("sLastMonth",sLastMonth )
  // console.log("eLastMonth", eLastMonth)

  // OLLLDDDDD

  const [moneyThisMonth, setMoneyThisMonth] = useState();
  const [moneyLastMonth, setMoneyLastMonth] = useState();

  const bulan =
    latestTransaction &&
    latestTransaction.map((row) => ({
      total_value: row[3].stringValue,
      created_at: moment(row[4].stringValue).format("YYYY-MM"),
    }));
  const objBulanIni = bulan && bulan.filter((o) => o.created_at === bulanIni);
  const currentBulanIni =
    objBulanIni &&
    objBulanIni
      .map((v) => Number(v.total_value))
      .reduce((sum, current) => sum + current, 0);

  const objBulanLalu = bulan && bulan.filter((o) => o.created_at === bulanLalu);
  const currentBulanLalu =
    objBulanLalu &&
    objBulanLalu
      .map((v) => Number(v.total_value))
      .reduce((sum, current) => sum + current, 0);

  useEffect(() => {
    setMoneyThisMonth(currentBulanIni === undefined ? 0 : currentBulanIni);
  }, [currentBulanIni]);

  useEffect(() => {
    setMoneyLastMonth(currentBulanLalu === undefined ? 0 : currentBulanLalu);
  }, [currentBulanLalu]);

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  // NEWWWWWWWWWWWW
  // useEffect(() => {
  //   setMoneyThisMonth(earningThisMonth === undefined ? 0 : earningThisMonth);
  // }, [earningThisMonth]);

  // useEffect(() => {
  //   setMoneyLastMonth(earningLastMonth === undefined ? 0 : earningLastMonth);
  // }, [earningLastMonth]);

  // const formatter = new Intl.NumberFormat("id-ID", {
  //   style: "currency",
  //   currency: "IDR",
  // });
//   useEffect(
//     () => {
//       setEarningThisMonth(
//         Number(earningThisMonthHotel) +
//           Number(earningThisMonthParkir) +
//           Number(earningThisMonthRestoran)
//       );
//     },
//     [earningThisMonthHotel],
//     [earningThisMonthParkir],
//     [earningThisMonthRestoran]
//   );
//   useEffect(() => {
//     getEarningThisMonth();
//   }, []);

//   const getEarningThisMonth = async () => {
//     const decoded = jwtDecode(localStorage.token);
//     const apiKey = decoded["api-key"];
//     // const headers = {
//     //   "x-api-key": `${apiKey}`,
//     //   "content-type": "application/json",
//     // };
//     const response = await fetch(
//       "https://api.raspi-geek.com/v1/earnsbycat",

//       {
//         method: "POST",
//         headers: {
//           "x-api-key": `${apiKey}`,
//           "content-type": "application/json",
//         },
//         body: JSON.stringify({
//           startdate: sThisMonth,
//           enddate: eThisMonth,
//         }),
//       }
//     );
//     const ajson = await response.json();


//     if (ajson.Records.length === 1 && ajson.Records[0][0].stringValue === "Hotel" || "Restoran" || "Parkir") {
//       setEarningThisMonthRestoran(ajson.Records[0][1].stringValue);
//     } else {
//       setEarningThisMonthRestoran(0);
//     }
//     if (ajson.Records.length === 2 && ajson.Records[1][0].stringValue === "Hotel" || "Restoran" || "Parkir") {
//       setEarningThisMonthHotel(ajson.Records[1][1].stringValue);
//     } else {
//       setEarningThisMonthHotel(0);
//     }
// console.log("ajson.Records.length",ajson.Records.length)

//     // if (ajson.Records.length === 3) {
//     //   setEarningLastMonthParkir(ajson.Records[2][1].stringValue);
//     // } else {
//     //   setEarningThisMonthParkir(0);
//     // }

//     if (ajson.Records.length === 3 && ajson.Records[2][0].stringValue === "Hotel" || "Restoran" || "Parkir") {
//       setEarningLastMonthParkir(ajson.Records[2][1].stringValue);
//     } else {
//       setEarningThisMonthParkir(0);
//     }


//     console.log("ajson.Records[2][1].stringValue", ajson.Records.length);
//   };
//   console.log("earningThisMonth", earningThisMonth);

  useEffect(
    () => {
      setEarningLastMonth(
        Number(earningLastMonthHotel) +
          Number(earningLastMonthParkir) +
          Number(earningLastMonthRestoran)
      );
    },
    [earningLastMonthHotel],
    [earningLastMonthParkir],
    [earningLastMonthRestoran]
  );
  useEffect(() => {
    getEarningLastMonth();
  }, []);

  const getEarningLastMonth = async () => {
    const decoded = jwtDecode(localStorage.token);
    const apiKey = decoded["api-key"];
    // const headers = {
    //   "x-api-key": `${apiKey}`,
    //   "content-type": "application/json",
    // };
    const response = await fetch(
      "https://api.raspi-geek.com/v1/earnsbycat",

      {
        method: "POST",
        headers: {
          "x-api-key": `${apiKey}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          startdate: sLastMonth,
          enddate: eLastMonth,
        }),
      }
    );
    const ajson = await response.json();
    if (ajson.Records.length === 1) {
      setEarningLastMonthRestoran(ajson.Records[0][1].stringValue);
    } else {
      setEarningLastMonthRestoran(0);
    }
    if (ajson.Records.length === 2) {
      setEarningLastMonthHotel(ajson.Records[1][1].stringValue);
    } else {
      setEarningLastMonthHotel(0);
    }

    if (ajson.Records.length === 3) {
      setEarningLastMonthParkir(ajson.Records[2][1].stringValue);
    } else {
      setEarningLastMonthParkir(0);
    }
  };
  console.log("earningLastMonth", earningLastMonth);

  const total = Number(moneyLastMonth) - Number(moneyThisMonth);

  return (
    <Col className="flip-card" xs={24} xl={8}>
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <EcommerceStatus
            color="teal"
            icon="revenue-new"
            title={
              <div className="title-card-dashboard">
                {currentBulanIni === undefined
                  ? formatter.format(0)
                  : formatter.format(currentBulanIni)}
              </div>

              // <div className="title-card-dashboard">
              //   {earningThisMonth === undefined
              //     ? formatter.format(0)
              //     : formatter.format(earningThisMonth)}
              // </div>
            }
            colorTitle="geekblue"
            moneyThisMonth={moneyThisMonth}
            setMoneyThisMonth={setMoneyThisMonth}
            moneyLastMonth={moneyLastMonth}
            setMoneyLastMonth={setMoneyLastMonth}
            objBulanIni={objBulanIni}
            subTitle={
              <div className="subtitle-card-dashboard">
                <span>Total Pendapatan</span>
                <br />
                <span>(Bulan Ini)</span>
              </div>
            }
            colorSubTitle="geekblue"
          />
        </div>
        <div class="flip-card-back">
          <EcommerceStatus
            icon="revenue-new"
            color="grey"
            title={
              <div  className="subtitle-card-dashboard-grey">
                {currentBulanLalu === undefined
                  ? formatter.format(0)
                  : formatter.format(currentBulanLalu)}
              </div>

              // <div className="subtitle-card-dashboard-grey">
              //   {earningLastMonth === undefined
              //     ? formatter.format(0)
              //     : formatter.format(earningLastMonth)}
              // </div>
            }
            colorTitle="dark"
            subTitle={
              <div className="subtitle-card-dashboard">
                <span>Total Pendapatan</span>
                <br />
                <span>(Bulan Lalu)</span>
              </div>
            }
            colorSubTitle="dark"
          />
        </div>
      </div>
    </Col>
  );
};

export default PendapatanBulanan;
