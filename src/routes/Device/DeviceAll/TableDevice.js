import React, { useState } from "react";
import Table from "antd/lib/table";
import "antd/lib/table/style/css";
import { Modal } from "antd";
import "antd/lib/button/style/css";
import "../../../assets/styles/table.css";

const TableDevice = (props) => {
  const { setListData, data } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataRecord, setDataRecord] = useState();
  const showModal = (record) => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const columns = [
    {
      title: "Device Id",
      dataIndex: "device_id",
      // editable: true,
      // render: (text, record) => (
      //   <button onClick={(e) => {
      //     setListData({
      //       aksiList: "lihatData",
      //       itemList: record
      //     })
      //   }
      //   } className="button-table">
      //     {/* <a href="https://google.com" >
      //         {record.device_id}
      //         </a> */}
      //     {record.device_id}
      //   </button>

      // ),
    },
    {
      title: "Owner",
      dataIndex: "owner",
      editable: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      editable: true,
    },
    {
      title: "Nama Usaha",
      dataIndex: "nama_usaha",
      editable: true,
    },
    {
      title: "Type Pajak",
      dataIndex: "type_pajak",
      editable: true,
    },
    // {
    //   title: 'Aksi',
    //   dataIndex: 'aksi',
    //   render: (text, record) => {
    //     return (
    //       <Button
    //         icon={<FormOutlined />}
    //         id={record.device_id}
    //         onClick={(e) => {
    //           setListData({
    //             aksiList: "editData",
    //             itemList: record
    //           })
    //         }
    //         }
    //         size="large"
    //       />
    //     )
    //   }
    // }
  ];

  return (
    <>
      <Table
        className="gx-table-no-bordered"
        dataSource={data}
        columns={columns}
        rowClassName={(record) => `gx-bg-${record.status}`}
        // onClick={showModal}
        onRow={(record, recordIndex) => ({
          onClick: (event) => {
            // console.log("onRow onClick",
            //   event.target, event.target.className, record, recordIndex)
            showModal(record);
            setDataRecord(record);
          },
        })}
      />
      {/* <Modal title={`${record.device_id}`} visible={isModalVisible} */}
      <Modal
        dataRecord={dataRecord}
        title={dataRecord?.nama_usaha}
        visible={isModalVisible}
        className="modal-container"
        footer={null}
        // onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="container-button">
          <button
            className="glow-on-hover"
            onClick={(e, record) => {
              setListData({
                aksiList: "lihatData",
                itemList: dataRecord,
              });
            }}
          >
            {" "}
            Lihat Data
          </button>
        </div>
        <div className="container-button">
          <button
            className="glow-on-hover"
            onClick={(e, record) => {
              setListData({
                aksiList: "editData",
                itemList: dataRecord,
              });
            }}
          >
            {" "}
            Edit Data
          </button>
        </div>
      </Modal>
    </>
  );
};

export default TableDevice;
// props: {
//   style: { background: record.status , color:"black"}
// },
