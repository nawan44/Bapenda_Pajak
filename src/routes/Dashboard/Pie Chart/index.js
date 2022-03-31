import React, {useState, useEffect} from "react";
import { Col, Row, Card } from "antd";
// import PieChartWithCustomizedLabel from ".pieChartWithCustomizedLabel";
import jwtDecode from "jwt-decode";
import * as moment from "moment";
import PiePendapatan from "./piePendapatan";

function PieChart() {
  const [getEarnByCat, setGetEarnByCat] = useState()    
  // const [earnByCat, setEarnByCat] = useState(0);
    const sThisMonth = moment().startOf("month").format("YYYY-MM-DD HH:mm:ss");
    const eThisMonth = moment().endOf("month").format("YYYY-MM-DD HH:mm:ss");

    const earnByCat =
    getEarnByCat &&
    getEarnByCat.map((row) => ({
      category: row[0].stringValue,
      total_value: row[1].stringValue,
    }));
    console.log("earnByCat",earnByCat);
    useEffect(() => {
      getEarning();
      }, []);
    
      const getEarning = async () => {
        const decoded = jwtDecode(localStorage.token);
        const apiKey = decoded["api-key"];
        const response = await fetch(
          "https://api.raspi-geek.com/v1/earnsbycat",
    
          {
            method: "POST",
            headers: {
              "x-api-key": `${apiKey}`,
              "content-type": "application/json",
            },
            body: JSON.stringify({
              startdate: sThisMonth,
              enddate: eThisMonth,
            }),
          }
        );
        const ajson = await response.json();
        setGetEarnByCat(ajson.Records)
        
      };

      return (
    <>

      <Col  span={12}>
        {/* <Card className="gx-card" title="Pendapatan Per Kategori"> */}
        <PiePendapatan getEarnByCat={getEarnByCat}/>
        {/* </Card> */}
      </Col>
      <Col  span={12}>
        {/* <Card className="gx-card" title="Status Device"> */}
        {/* </Card> */}
      </Col>
    </>
  );
}

export default PieChart;
