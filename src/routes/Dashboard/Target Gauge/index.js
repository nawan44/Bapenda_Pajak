import React from "react";
import GaugeChart from "react-gauge-chart";

function TargetGauge() {
  return (
    <div >
        <h2 >Target Pajak</h2>
      <GaugeChart
        id="gauge-chart5"
        nrOfLevels={420}
        arcsLength={[0.25,0.25, 0.25, 0.25]}
        textColor ={"#1966f5"}
        needleColor={"#a5a8ad"}
        colors={["#EA4228" ,"#f59d19", "#F5CD19","#5BE12C", ]}
        percent={0.37}
        arcPadding={0.02}
      />
<div >
<h4 style={{width:"30%", float:"left", }}>Realisasi : </h4>
      <h4 style={{width:"70%", float:"left", }}>Rp 37.000.000</h4>

</div>
<div >
<h4 style={{width:"30%", float:"left",}}>Target : </h4>
      <h4 style={{width:"70%", float:"left", }}>Rp 100.000.000</h4>

</div>
    </div>
  );
}

export default TargetGauge;
