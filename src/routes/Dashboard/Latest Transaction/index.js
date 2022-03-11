import React, { useState, useEffect } from "react";
import { Table, Input } from "antd";
import Widget from "components/Widget/index";
import reqOptions from "../../../util/reqOptions";
import styled from 'styled-components';

// import { TokenStorageService } from './token-storage.service';
import * as moment from 'moment';

import jwtDecode from 'jwt-decode';
import  EventsSection  from "./EventSection";

const FlexBox = styled.div`
  margin: 20px;
  padding: 20px;
  border: 1px solid palevioletred;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  > div {
    margin: 20px;
  }
`;
const users = [
  {
    nickname: "crazyfrog",
    email: "frog@foobar.com",
    alamat: "Jakarta",
    jumlah: 3,
  },
  {
    nickname: "tatanka",
    email: "ttt@hotmail.com",
    alamat: "Tangerang",
    jumlah: 7,
  },
  {
    nickname: "wild",
    email: "www@mail.ru",
    alamat: "Bogor",
    jumlah: 8,
  },
  {
    nickname: "race car",
    email: "racing@gmail.com",
    alamat: "Depok",
    jumlah: 9,
  },
  {
    nickname: "cook",
    email: "cooking@yahoo.com",
    alamat: undefined,
    jumlah: 4,
  },
];
const LatestTransaction = (props) => {
  const {latestTransaction, setLatestTransaction} = props
 
console.log("latestTransaction", latestTransaction)

    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    
    });
// 
const data = latestTransaction && latestTransaction.map(row => ({ 
  invoice_id: row[0].stringValue, 
  merchant_id: row[1].stringValue,
  nama_usaha : row[2].stringValue,
  total_value: formatter.format(row[3].stringValue) , 
  created_at: row[4].stringValue }));
  const [value, setValue] = useState('');
  const [dataSource, setDataSource] = useState(data);

  const InvoiceID = (
    <Input
      placeholder="Search Name"
      value={value}
      onChange={e => {
        const currValue = e.target.value;
        setValue(currValue);
        const filteredDatas = data.filter(entry =>
          entry.merchant_id.includes(currValue)
        );
        setDataSource(filteredDatas);
      }}
    />
  );
  const columns = [
    {
      title: InvoiceID,
      dataIndex: 'invoice_id',
      key: '1',

      // render: (text) => {
      //   return <span className="gx-text-red">{text}</span>
      // },
    },
    {key: '2',
      title: 'Device Id / Agent ID	',
      dataIndex: 'merchant_id',
    },
    {
      title: 'Nama Usaha	',
      dataIndex: 'nama_usaha',
    },
    {
      title: 'Transaction Value	',
      dataIndex: 'total_value',
    },
    {
      title: 'Tanggal Transaksi	',
      dataIndex: 'created_at',
    },
  ];
  const [loading, setloading] = useState(true);
  const [filter, setFilter] = useState("");
  const lowercasedFilter = filter.toString().toLowerCase();
  const filteredData = data?.filter((item) => {
    try {
      return Object.keys(item).some((key) => {
        if (item[key]) {
          return item[key].toLowerCase().includes(lowercasedFilter);
        }
      });
    } catch (e) {
      console.log("data tidak ada");
    }
  });
  const handleChangeData = (event) => {
    setFilter(event.target.value);
  };



  return (
    <Widget 
    styleName="gx-order-history"
      
    >
  
<EventsSection latestTransaction={latestTransaction} setLatestTransaction={setLatestTransaction}/>
    </Widget>
   
  );
};

export default LatestTransaction;
