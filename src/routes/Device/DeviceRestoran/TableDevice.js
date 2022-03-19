import React, { useState, useEffect } from "react";
import Table from "antd/lib/table";
import "antd/lib/table/style/css";
import { Modal, Button } from 'antd';
import "antd/lib/button/style/css";
import "../../../assets/styles/table.css"

const TableDevice = (props) => {
  const { listData, setListData, data, FormOutlined, state, setState } = props
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataRecord, setDataRecord] = useState()
  const showModal = (record) => {
    setIsModalVisible(true);
  };
console.log("listData /.......",listData)
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const columns = [
    {
      title: 'Device Id',
      dataIndex: 'device_id',
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
  ];
console.log("data", data)

  return (
    <>
      <Table dataSource={data} columns={columns}
        rowClassName={record => `gx-bg-${record.status}`}
        onRow={(record, recordIndex) => ({
          onClick: event => {
            console.log("onRow onClick",
              event.target, event.target.className, record, recordIndex)
            showModal(record)
            setDataRecord(record)
          }
        })}
      />
      <Modal dataRecord={dataRecord}
        title={dataRecord?.nama_usaha}
        visible={isModalVisible}
        className="modal-container"
        footer={null}
        onCancel={handleCancel}
      >
        <div className="container-button">
          <button
            className="glow-on-hover"
            onClick={(e, record) => {
              setListData({
                aksiList: "lihatData",
                itemList: dataRecord
              })
            }} > Lihat Data
          </button>
        </div>
        <div className="container-button">
          <button
            className="glow-on-hover"
            onClick={(e, record) => {
              setListData({
                aksiList: "editData",
                itemList: dataRecord
              })
            }} > Edit Data
          </button>
        </div>
      </Modal>

    </>
  )
};

export default TableDevice