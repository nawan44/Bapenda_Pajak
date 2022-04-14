import React from "react";
import Table from "antd/lib/table";
import "antd/lib/table/style/css";
import "antd/lib/button/style/css";

// import { StatusTag } from "../StatusTag";

const EventsTable = ({ data }) => {

  const columns = [
    {
      title: "Invoice ID",
      dataIndex: "invoice_id",

      // key: "1",
      // render: (text) => {
      //   return <span className="gx-text-red">{text}</span>
      // },
    },
    {
      // key: "2",
      title: "Device Id / Agent ID",
      dataIndex: "merchant_id",

    },
    {
      title: "Nama Usaha",
      dataIndex: "nama_usaha",

    },
    {
      title: "Transaction Value",
      dataIndex: "total_value",

    },
    {
      title: "Tanggal Transaksi",
      dataIndex: "created_at",

    },
  ];

  return (
    <Table
      className="gx-table-no-bordered"
      dataSource={data}
      columns={columns}
    />
    );
};

export default EventsTable;
