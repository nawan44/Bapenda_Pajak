import React, { useState, useEffect } from "react";
import { Table, Input, InputNumber, Popconfirm, Form, Typography, Button, Modal } from "antd";
import Widget from "components/Widget/index";
import IntlMessages from "util/IntlMessages";
import jwtDecode from "jwt-decode";
import "../../assets/styles/forRegistrasi.css"
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,OrderedListOutlined,UserOutlined,FormOutlined,
} from '@ant-design/icons';
import EditDeviceAgent from "../EditDeviceAgent"
import {useHistory} from "react-router-dom";



const ListDataDevice = (props) => {
    const {aksiList, itemList,selectedRecord, setSelectedRecord,listData, setListData} =props
  const [form] = Form.useForm();
  const history = useHistory();

  const [listDevice, setListDevice] = useState()
  useEffect(() => {
    getListDevice();
  }, []);
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  const dataMasuk = listDevice && listDevice.map(row => ({
    // key : row.toString(),
    device_id: row[0].stringValue,
    owner: row[1].stringValue,
    email: row[3].stringValue,
    nama_usaha: row[4].stringValue,
    type_pajak: row[6].stringValue,

    nik: row[2].stringValue,
    alamat: row[5].stringValue,
    data_source: row[7].stringValue,
    isactive: row[8].stringValue,

  }));

  console.log("selectedRecord list", selectedRecord)
// const editStepper = (e, record) => {
//   console.log("record >>>>", record)
//   if (record){
//     // console.log("okokok")
//   return( <EditDeviceAgent selectedRecord ={selectedRecord} setSelectedRecord ={setSelectedRecord}/>)
// }
// }

  const columns = [
    {
      title: 'Device Id',
      dataIndex: 'device_id',
      editable: true,
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
      render : (text, record) => {
        return(
        // <Typography.Link onClick={(e) => editStepper(record)} size="middle">
        //   {/* <a>Invite {record.lastName}</a> */}
        //  Edit
        // </Typography.Link>
        
        
        <Button
        icon={<FormOutlined />}
        id={record.id}
        onClick={(e )=> {
          // showModal()
        //   setSelectedRecord(record)
          console.log("console",  record); 
          setListData({
            aksiList: "editData",
            itemList : record
          })
          // editStepper( record) 
          // history.push("/edit-device-agent");
          // <EditDeviceAgent record={record}/>
          // setSelectedRecord(record);
        }

        }
//record is the row data
        size="large"
        
      />
        )
      }
      // render: (_, e) => {
      //   // const editable = isEditing(record);
      //   return  (
      //     <Typography.Link onClick={(e) => editStepper(e)}>
      //         Edit
      //      </Typography.Link>
      //   //   <span>
      //   //     <Typography.Link
      //   //       onClick={() => save(record.key)}
      //   //       style={{
      //   //         marginRight: 8,
      //   //       }}
      //   //     >
      //   //       Save
      //   //     </Typography.Link>
      //   //     <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
      //   //       <a>Cancel</a>
      //   //     </Popconfirm>
      //   //   </span>
      //   // ) : (
      //   //   <Typography.Link disabled={editingKey !== ''} onClick={(e) => editStepper(e)}>
      //   //     Edit
      //   //   </Typography.Link>
      //   );
      // },
    }
  ];
 
  // useEffect(() => {
  //   getListDevice();
  //   const interval = setInterval(() => {
  //     getListDevice()
  //   }, 10000)


  //   return () => clearInterval(interval)
  // }, []);

  const getListDevice = async (dataLatest) => {
    const decoded = jwtDecode(localStorage.token)
    const apiKey = decoded["api-key"]
    const token = localStorage.getItem('token')
    const headers = {
      'x-api-key': `${apiKey}`,
      'content-type': 'application/json',

      'Authorization': `Bearer ${token}`
    }
    const response = await fetch(
      "https://api.raspi-geek.com/v1/merchants",

      { method: "GET", headers }
    );
    const ajson = await response.json();
    setListDevice(ajson.Records)
  }
  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };
  const showModal = () => {
    setVisible(true);
  };
  return (
    <>
    <Widget styleName="gx-order-history"
      title={
        <h2 className="h2 gx-text-capitalize gx-mb-0">
          Daftar Device / Agent</h2>
      }
    >
      <div className="gx-table-responsive">
        <Table className="gx-table-no-bordered" columns={columns} dataSource={dataMasuk} pagination={false} bordered={false}
        size="small" />
        {/* <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={dataTable}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{
              onChange: cancel,
            }}
          />
        </Form> */}
      </div>
    </Widget>
         <Modal
         title="Title"
         visible={visible}
         onOk={handleOk}
         confirmLoading={confirmLoading}
         onCancel={handleCancel}
       >
         {/* <p>{modalText}</p> */}
         <EditDeviceAgent selectedRecord ={selectedRecord} setSelectedRecord ={setSelectedRecord} />
       </Modal>
       </>
  );
};

export default ListDataDevice;
