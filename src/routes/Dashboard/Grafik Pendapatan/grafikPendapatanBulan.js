import React, {  useState,  } from 'react';
import { ComposedChart, Line, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,} from 'recharts';
import * as moment from 'moment';
import Widget from "components/Widget/index";
import 'moment/locale/id'
import "../../../assets/styles/flip-card.css"

const data = [
  { name: 'Page A', uv: 4000, price: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, price: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, price: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, price: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, price: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, price: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, price: 4300, amt: 2100 },
];
const latestTransaction = [
    [
    {
      "stringValue": "5bda50ab-9940-11ec-8a2c-a97e6ec00a1c"
    },
    {
      "stringValue": "DEJARDIN0001"
    },
    {
      "stringValue": "Rumah Makan Sederhana"
    },
    {
      "stringValue": "534650.00"
    },
    {
      "stringValue": "2022-01-19 16:14:00"
    }

  
  ],
  [
    {
      "stringValue": "5bda50ab-9940-11ec-8a2c-a97e6ec00a1c"
    },
    {
      "stringValue": "DEJARDIN0001"
    },
    {
      "stringValue": "Rumah Makan Sederhana"
    },
    {
      "stringValue": "734650.00"
    },
    {
      "stringValue": "2022-02-11 16:14:00"
    }

  
  ],
  [
    {
      "stringValue": "5bda50ab-9940-11ec-8a2c-a97e6ec00a1c"
    },
    {
      "stringValue": "DEJARDIN0001"
    },
    {
      "stringValue": "Rumah Makan Sederhana"
    },
    {
      "stringValue": "834650.00"
    },
    {
      "stringValue": "2022-03-19 16:14:00"
    }

  
  ],
  [
    {
      "stringValue": "5bda50ab-9940-11ec-8a2c-a97e6ec00a1c"
    },
    {
      "stringValue": "DEJARDIN0001"
    },
    {
      "stringValue": "Rumah Makan Sederhana"
    },
    {
      "stringValue": "634650.00"
    },
    {
      "stringValue": "2022-04-19 16:14:00"
    }

  
  ],
  [
    {
      "stringValue": "5bda50ab-9940-11ec-8a2c-a97e6ec00a1c"
    },
    {
      "stringValue": "DEJARDIN0001"
    },
    {
      "stringValue": "Rumah Makan Sederhana"
    },
    {
      "stringValue": "764650.00"
    },
    {
      "stringValue": "2022-05-19 16:14:00"
    }

  
  ],
  [
    {
      "stringValue": "5bda50ab-9940-11ec-8a2c-a97e6ec00a1c"
    },
    {
      "stringValue": "DEJARDIN0001"
    },
    {
      "stringValue": "Rumah Makan Sederhana"
    },
    {
      "stringValue": "834650.00"
    },
    {
      "stringValue": "2022-06-19 16:14:00"
    }

  
  ],
  [
    {
      "stringValue": "5bda50ab-9940-11ec-8a2c-a97e6ec00a1c"
    },
    {
      "stringValue": "DEJARDIN0001"
    },
    {
      "stringValue": "Rumah Makan Sederhana"
    },
    {
      "stringValue": "934650.00"
    },
    {
      "stringValue": "2022-07-19 16:14:00"
    }

  
  ],
]

const GrafikPendapatanBulan = (props) => {
  // const {latestTransaction, setLatestTransactio} = props
const [dataBulan, setDataBulan] = useState([
  { nama: '', total_value: null }
])
  const bulanJanuari = moment().format('YYYY-01')
  const bulanFebruari = moment().format('YYYY-02')

  const [moneyThisMonth, setMoneyThisMonth] = useState()
  const [moneyLastMonth, setMoneyLastMonth] = useState()

  const bulan = latestTransaction && latestTransaction.map(row => ({
    created_at:  moment(row[4].stringValue).format('MMMM YYYY'),

    total_value: Number(row[3].stringValue),
  }));


  const objBulanJanuari = bulan && bulan.filter(o => o.created_at === bulanJanuari);

//  const sumOfId = (created_at) => bulan && bulan.filter(i => i.created_at === created_at).reduce((a, b) => a + b.total_value, 0);



//   const currentBulanJanuari = objBulanJanuari && objBulanJanuari.map(v => Number(v.total_value))
//     .reduce((sum, current) => sum + current, 0)

//   const objBulanFebruari = bulan && bulan.filter(o => o.created_at === bulanFebruari);
//   const currentBulanLalu = objBulanFebruari && objBulanFebruari.map(v => Number(v.total_value))
//     .reduce((sum, current) => sum + current, 0)

    const shooters = bulan?.reduce(
      (results, current, ) => ({
        ...results,
        [current.created_at ]: {
          created_at: current.created_at,
          total_value: current.total_value + (results[current.created_at] ? results[current.created_at].total_value : 0),
        }
      }),
      {}
    );
   
console.log("Object.values(shooters)",Object.values(shooters))
  
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',


  });

  
  return (
    <Widget
      styleName="gx-order-history"
    style={{backgroundColor:"red"}}
      title={
        <h2 style={{textAlign:"left"}} >
          Pendapatan 2022
        </h2>
      }

    >
      <ResponsiveContainer width="95%" height={300}>

        <ComposedChart
          data={Object.values(shooters)}
          // data={data}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="created_at" scale="band" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total_value" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="total_value" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>

    </Widget>
  );
};

export default GrafikPendapatanBulan;

