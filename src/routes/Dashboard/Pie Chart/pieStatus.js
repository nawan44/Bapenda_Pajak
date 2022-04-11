// import React, { useState, useEffect } from "react";
// import { Pie } from "react-chartjs-2";
// // import "chart.js/auto";
// import ChartDataLabels from "chartjs-plugin-datalabels";
// // import 'chart.piecelabel.js';
// import jwtDecode from "jwt-decode";
// import { red } from "@ant-design/colors";

// function PieStatus({ getEarnByCat }) {
//   const totalValue =
//     getEarnByCat &&
//     getEarnByCat.map((row) => ({
//       total_value: Number(row[1].stringValue),
//     }));
//   const categoryValue =
//     getEarnByCat &&
//     getEarnByCat.map((row) => ({
//       category: row[0].stringValue,
//     }));

//   const [listDevice, setListDevice] = useState();

//   useEffect(() => {
//     getListDevice();
//   }, []);
//   const getListDevice = async (dataLatest) => {
//     const decoded = jwtDecode(localStorage.token);
//     const apiKey = decoded["api-key"];
//     const headers = {
//       "x-api-key": `${apiKey}`,
//       "content-type": "application/json",
//     };
//     const response = await fetch(
//       "https://api.raspi-geek.com/v1/merchants",

//       { method: "GET", headers }
//     );
//     const ajson = await response.json();
//     setListDevice(ajson.Records);
//   };

//   const statusFilter =
//     listDevice &&
//     listDevice.map((row) => ({
//       // nik: row[3].stringValue,

//       type: row[7].stringValue,
//       status: row[9].stringValue,
//     }));

//   const greenStatus = statusFilter?.find((o) => o.status === "green");
//   const orangeStatus = statusFilter?.filter((o) => o.status === "orange");
//   const redStatus = statusFilter?.filter((o) => o.status === "red");

//   const status = listDevice?.map((row) => ({
//     green: greenStatus?.length,
//     orange: orangeStatus?.length,
//     red: redStatus?.length,
//   }));

//   let result =
//     statusFilter &&
//     statusFilter.length &&
//     Object.values(
//       statusFilter.reduce((a, { status }) => {
//         let key = `${status}`;
//         a[key] = a[key] || { status, total_value: 0 };
//         a[key].total_value++;
//         return a;
//       }, {})
//     );

//   let resultStatus = [
//     { status: "green", total_value: 30 },
//     { status: "orange", total_value: 15 },
//     { status: "red", total_value: 5 },
//   ];

//   const data = {
//     labels:
//       //  ["Online", "2 Hari Off", "3 Hari Off"],
//       [
//         resultStatus?.filter((o) => o.status === "green") === "green"
//           ? "Online"
//           : "Online",
//         resultStatus?.filter((o) => o.status === "red") === "red"
//           ? "3 Hari Off"
//           : "3 Hari Off",
//         resultStatus?.filter((o) => o.status === "orange") === "orange"
//           ? "2 Hari Off"
//           : "2 Hari Off",
//       ],

//     // labels: {
//     //     render: 'percentage',

//     //   },

//     datasets: [
//       {
//         label: { render: " value" },
//         data: resultStatus?.map(function (item) {
//           return item["total_value"];
//         }),
//         borderColor: ["rgba(175,71,156,0.2)"], //merah
//         borderWidth: 5,
//         backgroundColor: [
//           resultStatus?.filter((o) => o.status === "green")?.length === 1
//             ? "rgba(0,128,0)"
//             : "rgba(0,128,0)",
//           resultStatus?.filter((o) => o.status === "red")?.length === 1
//             ? "rgba(255,0,0)"
//             : "rgba(255,0,0)",
//           resultStatus?.filter((o) => o.status === "orange")?.length === 1
//             ? "rgba(255, 165, 0)"
//             : "rgba(255, 165, 0)",

//           "rgba(232,99,132,1)", //merah
//           "rgba(232,211,6,1)", // kuning
//           "rgba(54,162,235,1)", //biru
//           // 'rgba(255,159,64,1)', // orange
//           // 'rgba(153,102,255,1)' //ungu
//         ],
//         pointBackgroundColor: "rgba(255,206,86,0.2)", //transparent
//         // backgroundImage: 'lightblue url("https://www.chartjs.org/img/chartjs-logo.svgf") no-repeat fixed center'
//       },
//     ],
//   };

//   const options = {
//     plugins: {
//       labels: {
//         // render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
//         render: " value",

//         // precision for percentage, default is 0
//         precision: 0,

//         // identifies whether or not labels of value 0 are displayed, default is false
//         showZero: true,

//         // font size, default is defaultFontSize
//         fontSize: 12,

//         // font color, can be color array for each data or function for dynamic color, default is defaultFontColor
//         fontColor: "#fff",

//         // font style, default is defaultFontStyle
//         fontStyle: "normal",

//         // font family, default is defaultFontFamily
//         fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

//         // draw text shadows under labels, default is false
//         textShadow: true,

//         // text shadow intensity, default is 6
//         shadowBlur: 10,

//         // text shadow X offset, default is 3
//         shadowOffsetX: -5,

//         // text shadow Y offset, default is 3
//         shadowOffsetY: 5,

//         // text shadow color, default is 'rgba(0,0,0,0.3)'
//         shadowColor: "rgba(255,0,0,0.75)",

//         // draw label in arc, default is false
//         // bar chart ignores this
//         arc: true,

//         // position to draw label, available value is 'default', 'border' and 'outside'
//         // bar chart ignores this
//         // default is 'default'
//         position: "default",

//         // draw label even it's overlap, default is true
//         // bar chart ignores this
//         overlap: true,
//       },
//       title: {
//         display: true,
//         text: "Status Device",
//         color: "blue",
//         font: {
//           size: 24,
//         },
//         padding: {
//           bottom: 10,
//         },
//         animation: {
//           animateScale: true,
//         },
//       },
//     },
//   };
//   return (
//     <div style={{width:"300px", textAlign:"center", margin:"0 auto"}}>
//     <Pie data={data} options={options} />
//     </div>
//   );
// }

// export default PieStatus;
