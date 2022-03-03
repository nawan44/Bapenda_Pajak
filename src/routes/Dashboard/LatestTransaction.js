import React, { useState, useEffect } from "react";
import { Table } from "antd";
import Widget from "components/Widget/index";
import reqOptions from "../../util/reqOptions";
// import { TokenStorageService } from './token-storage.service';
import * as moment from 'moment';

import jwtDecode from 'jwt-decode';

const columns = [
  {
    title: 'Transaction ID',
    dataIndex: 'invoice_id',
    // render: (text) => {
    //   return <span className="gx-text-red">{text}</span>
    // },
  },
  {
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

const LatestTransaction = (props) => {
  const {latestTransaction, setLatestTransaction} = props
  const [loading, setloading] = useState(true);

  // const data = latestTransaction && latestTransaction.map(row => ({ 
  //   transaction_id: row[0].stringValue, 
  //   merchant_id: row[2].stringValue,
  //  transaction_value: row[3].stringValue, 
  // tanggal_transaksi: row[1].stringValue }));

  const data = latestTransaction && latestTransaction.map(row => ({ 
    invoice_id: row[0].stringValue, 
    merchant_id: row[1].stringValue,
    nama_usaha : row[2].stringValue,
    total_value: row[3].stringValue, 
    created_at: row[4].stringValue }));

  return (
    <Widget 
    styleName="gx-order-history"
    style={{backgroundColor:"red"}}
      title={
        <h2 style={{textAlign:"left"}} >
          10 Latest Transaction
        </h2>
      }

    >
      <div 
      className="gx-table-responsive" 
      >
        <Table 
        className="gx-table-no-bordered"   columns={columns} dataSource={data} pagination={false} bordered={false}
          size="large"
           />
      </div>

    </Widget>
  );
};

export default LatestTransaction;
