import React from "react";
import Table from "antd/lib/table";
import "antd/lib/table/style/css";
import Button from "antd/lib/button";
import "antd/lib/button/style/css";

// import { StatusTag } from "../StatusTag";

const EventsTable = ({ data }) => {
    const columns = [
        {
          title: "Invoice ID",
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
  const tableColumns = [
    {
      title: "ID",
      dataIndex: "key",
      key: "id"
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title"
    },
    {
      title: "File Type",
      dataIndex: "fileType",
      key: "fileType"
    },
    {
      title: "Process",
      dataIndex: "process",
      key: "process"
    },
    {
      title: "Performed By",
      dataIndex: "performedBy",
      key: "performedBy"
    },
    {
      title: "Operation Note",
      dataIndex: "operationNote",
      key: "operationNote"
    },
    {
      title: "Update Date / Time",
      dataIndex: "updatedAt",
      key: "updatedAt"
    },


  ];



  return <Table dataSource={data} columns={columns} />;
};

export default EventsTable ;
