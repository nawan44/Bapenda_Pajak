import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

function TopTenRevenue() {
  const [topTenRevenue, setTopTenRevenue] = useState();
  console.log("topTenRevenue", topTenRevenue);

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
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  const dataTopTenRevenue = topTenRevenue?.map((row, index) => ({
    key: index + 1,
    nama_wp: row[0].stringValue,
    nik: row[1].stringValue,
    nominal_Revenue: formatter.format(row[2].stringValue),
  }));

  console.log("dataTopTenRevenue", dataTopTenRevenue);
  return (
    <div>
      {/* {topTenRevenue} */}
      <h2>Top Ten Revenue</h2>
      <ol>
        {dataTopTenRevenue?.map((row, i) => (
          <h3>
            {" "}
            <div style={{ width: "60%", float: "left" }}>
              <li key={row.key}>{row.nama_wp}</li>
              <h5>{row.nik}</h5>
            </div>
            <div style={{ width: "40%", float: "left" }}>
              <h3>{row.nominal_Revenue}</h3>
            </div>
          </h3>
        ))}
      </ol>
    </div>
  );
}

export default TopTenRevenue;
