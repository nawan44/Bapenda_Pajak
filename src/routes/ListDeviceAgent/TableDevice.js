import React from "react";
import Table from "antd/lib/table";
import "antd/lib/table/style/css";
import Button from "antd/lib/button";
import "antd/lib/button/style/css";
// import FormOutlined from '@ant-design/icons';
import "../../assets/styles/table.css"
// import { StatusTag } from "../StatusTag";

const TableDevice =  (props) => {
  const { listData, setListData , data, FormOutlined } = props     
   const columns = [
        {
          title: 'Device Id',
          dataIndex: 'device_id',
          // editable: true,
          render: (text, record) => (
            <button   onClick={(e) => {
              setListData({
                aksiList: "lihatData",
                itemList: record
              })
            }
            } className="button-table">
              {/* <a href="https://google.com" >
              {record.device_id}
              </a> */}
               {record.device_id}
            </button>
            
           ),
        },
        {
          title: 'Owner',
          dataIndex: 'owner',
          editable: true,
        },
        {
          title: 'Email',
          dataIndex: 'email',
          editable: true,
        },
    
        {
          title: 'Nama Usaha',
          dataIndex: 'nama_usaha',
          editable: true,
        },
        {
          title: 'Type Pajak',
          dataIndex: 'type_pajak',
          editable: true,
        },
        {
          title: 'Aksi',
          dataIndex: 'aksi',
          render: (text, record) => {
            return (
              <Button
                icon={<FormOutlined />}
                id={record.device_id}
                onClick={(e) => {
                  setListData({
                    aksiList: "editData",
                    itemList: record
                  })
                }
                }
                size="large"
              />
            )
          }
        }
      ];


  return <Table dataSource={data} columns={columns} />;
};

export default TableDevice ;
