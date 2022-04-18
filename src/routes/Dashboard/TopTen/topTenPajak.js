import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

function TopTenPajak() {
  const [topTenPajak, setTopTenPajak] = useState();
  const [visibleBlogs, setVisibleBlogs] = useState(1)
  const [up, setUp] = useState (true)
  const [down, setDown] = useState (false)


  console.log("topTenPajak", topTenPajak);
  const handleClickUp = () => {
    setVisibleBlogs(prevVisibleBlogs => prevVisibleBlogs + 2)
    setUp(false)
    setDown(true)
    
}
const handleClickDown = () => {
  setVisibleBlogs(prevVisibleBlogs => prevVisibleBlogs - 2)
  setUp(true)
  setDown(false)
  
}
  useEffect(() => {
    getTopTenPajak();
  }, []);
  const getTopTenPajak = async () => {
    const decoded = jwtDecode(localStorage.token);
    const apiKey = decoded["api-key"];
    const headers = {
      "x-api-key": `${apiKey}`,
      "content-type": "application/json",
    };
    const response = await fetch(
      "https://api.raspi-geek.com/v1/topten?type=pajak",

      { method: "GET", headers }
    );
    const res = await response.json();
    setTopTenPajak(res.Records);
  };
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  const dataTopTenPajak = topTenPajak?.map((row, index) => ({
    key: index + 1,
    nama_wp: row[0].stringValue,
    nik: row[1].stringValue,
    nominal_pajak: formatter.format(row[2].stringValue),
  }));

  
  console.log("dataTopTenPajak", dataTopTenPajak);
  return (
    <div>
      {/* {topTenPajak} */}
      <h2>Top Ten Pajak</h2>
      <ol>
        {dataTopTenPajak?.slice(0, visibleBlogs).map((row, i) => (
          <h3>
            {" "}
            <div style={{ width: "60%", float: "left" }}>
              <li key={row.key}>{row.nama_wp}</li>
              <h5>{row.nik}</h5>
            </div>
            <div style={{ width: "40%", float: "left" }}>
              <h3>{row.nominal_pajak}</h3>
            </div>
          </h3>
        ))}
      </ol>
      <div>
{
  up == true ?<button type="button" onClick={handleClickUp} >
  up more
</button> : <div> </div>
}

</div>
<div>
{
  down == true ?<button type="button" onClick={handleClickDown} >
  DOWN
</button> : <div> </div>
}

</div>
      
    </div>
  );
}

export default TopTenPajak;
