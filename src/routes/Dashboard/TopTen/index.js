import React, { useState, useEffect } from "react";
import { Avatar, Divider, Timeline } from "antd";
import WidgetHeader from "../../../components/WidgetHeader/index";
// import ActivityItem from "./ActivityItem";
import ActivityItem from "../../../components/dashboard/CRM/ActivityItem";
import TopTenPajak from "./topTenPajak";
import TopTenRevenue from "./topTenRevenue";
import TopTenTransaction from "./topTenTransaction";
import jwtDecode from "jwt-decode";

function TopTen() {
  const [topTenRevenue, setTopTenRevenue] = useState();

  useEffect(() => {
    getTopTenRevenue();
  }, []);
  const getTopTenRevenue = async () => {
    const decoded = jwtDecode(localStorage.token);
    const apiKey = decoded["api-key"];
    const headers = {
      "x-api-key": `${apiKey}`,
      "content-type": "application/json",
    };
    const response = await fetch(
      "https://api.raspi-geek.com/v1/topten?type=revenue",

      { method: "GET", headers }
    );
    const res = await response.json();
    setTopTenRevenue(res.Records);
  };

  return (
    <div className="gx-entry-sec">
      <WidgetHeader />

      <div className="gx-timeline-info">
        {/* <h4 className="gx-timeline-info-day">AAA</h4> */}

        {topTenRevenue?.length > 1 ? (
          <div>
            <TopTenPajak />
            <Divider />
            <TopTenRevenue
              topTenRevenue={topTenRevenue}
              setTopTenRevenue={setTopTenRevenue}
            />
            <Divider />
            <TopTenTransaction />
          </div>
        ) : (
          "Data Top 10 Tidak Ada"
        )}
      </div>
    </div>
  );
}

export default TopTen;
