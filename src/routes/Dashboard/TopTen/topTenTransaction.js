import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

function TopTenTransaction() {
  const [topTenTransaction, setTopTenTransaction] = useState();
  console.log("topTenTransaction", topTenTransaction);

  useEffect(() => {
    getTopTenTransaction();
  }, []);
  const getTopTenTransaction = async () => {
    const decoded = jwtDecode(localStorage.token);
    const apiKey = decoded["api-key"];
    const headers = {
      "x-api-key": `${apiKey}`,
      "content-type": "application/json",
    };
    const response = await fetch(
      "https://api.raspi-geek.com/v1/topten?type=transaction",

      { method: "GET", headers }
    );
    const res = await response.json();
    setTopTenTransaction(res.Records);
  };
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  const dataTopTenTransaction = topTenTransaction?.map((row, index) => ({
    key: index + 1,
    nama_wp: row[0].stringValue,
    nik: row[1].stringValue,
    nominal_Transaction: row[2].longValue,
  }));

  console.log("dataTopTenTransaction", dataTopTenTransaction);
  return (
    <div>
      {/* {topTenTransaction} */}
      <h2>Top Ten Transaction</h2>
      <ol>
        {dataTopTenTransaction?.map((row, i) => (
          <h3>
            {" "}
            <div style={{ width: "60%", float: "left" }}>
              <li key={row.key}>{row.nama_wp}</li>
              <h5>{row.nik}</h5>
            </div>
            <div style={{ width: "40%", float: "left" }}>
              <h3>{row.nominal_Transaction}</h3>
            </div>
          </h3>
        ))}
      </ol>
    </div>
  );
}

export default TopTenTransaction;
