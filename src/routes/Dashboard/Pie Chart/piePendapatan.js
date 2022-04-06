import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
// import 'chart.piecelabel.js';

function PiePendapatan({ getEarnByCat }) {
  const totalValue =
    getEarnByCat &&
    getEarnByCat.map((row) => ({
      total_value: Number(row[1].stringValue),
    }));
  const categoryValue =
    getEarnByCat &&
    getEarnByCat.map((row) => ({
      category: row[0].stringValue,
    }));
  // var total = earnByCat.map(function(item) {
  //     return item['total_value'];
  // //   })
  // console.log("total", total)

  const data = {
    labels: categoryValue?.map(function (item) {
      return item["category"];
    }),
    // labels: {
    //     render: 'percentage',

    //   },

    datasets: [
      {
        label: { render: " value" },
        data: totalValue?.map(function (item) {
          return item["total_value"];
        }),
        borderColor: ["rgba(175,71,156,0.2)"],
        borderWidth: 5,
        backgroundColor: [
          "rgba(232,99,132,1)",
          "rgba(232,211,6,1)",
          "rgba(54,162,235,1)",
          "rgba(255,159,64,1)",
          "rgba(153,102,255,1)",
        ],
        pointBackgroundColor: "rgba(255,206,86,0.2)",
        // backgroundImage: 'lightblue url("https://www.chartjs.org/img/chartjs-logo.svgf") no-repeat fixed center'
      },
    ],
  };

  const options = {
    plugins: {
      labels: {
        // render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
        render: " value",

        // precision for percentage, default is 0
        precision: 0,

        // identifies whether or not labels of value 0 are displayed, default is false
        showZero: true,

        // font size, default is defaultFontSize
        fontSize: 12,

        // font color, can be color array for each data or function for dynamic color, default is defaultFontColor
        fontColor: "#fff",

        // font style, default is defaultFontStyle
        fontStyle: "normal",

        // font family, default is defaultFontFamily
        fontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

        // draw text shadows under labels, default is false
        textShadow: true,

        // text shadow intensity, default is 6
        shadowBlur: 10,

        // text shadow X offset, default is 3
        shadowOffsetX: -5,

        // text shadow Y offset, default is 3
        shadowOffsetY: 5,

        // text shadow color, default is 'rgba(0,0,0,0.3)'
        shadowColor: "rgba(255,0,0,0.75)",

        // draw label in arc, default is false
        // bar chart ignores this
        arc: true,

        // position to draw label, available value is 'default', 'border' and 'outside'
        // bar chart ignores this
        // default is 'default'
        position: "default",

        // draw label even it's overlap, default is true
        // bar chart ignores this
        overlap: true,
      },
      title: {
        display: true,
        text: "Pendapatan",
        color: "blue",
        font: {
          size: 24,
        },
        padding: {
          bottom: 10,
        },
        animation: {
          animateScale: true,
        },
      },
    },
  };
  return (
    <div style={{ width: "300px", textAlign: "center", margin: "0 auto" }}>
      <Pie data={data} options={options} />
    </div>
  );
}

export default PiePendapatan;
