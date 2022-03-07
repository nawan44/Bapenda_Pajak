import React, { useState, useEffect } from "react";
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from "antd";
import Widget from "components/Widget/index";
import IntlMessages from "util/IntlMessages";
import jwtDecode from "jwt-decode";
import "../../assets/styles/forRegistrasi.css"



const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const ListDeviceAgent = () => {
  const [form] = Form.useForm();

  const [listDevice, setListDevice] = useState()
  // const dataMasuk = [];
  // for (let i = 0; i < 100; i++) {
  //   dataMasuk.push({
  //     key: i,
  //     device_id: "",
  //     owner: "",
  //     email: "",
  //     nama_usaha: "",
  //     type_pajak:""
  //   });
  // }
  const dataMasuk = listDevice && listDevice.map(row => ({
    key : row.toString(),
    device_id: row[0].stringValue,
    owner: row[1].stringValue,
    email: row[3].stringValue,
    nama_usaha: row[4].stringValue,
    type_pajak: row[6].stringValue
  }));

  const [dataTable, setDataTable] = useState(dataMasuk)

  useEffect(
    () => {
      setDataTable(dataMasuk);
    },
    [listDevice]
);
  console.log("dataMasuk", dataMasuk)

console.log("dataTable", dataTable)
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      device_id: '',
      owner: '',
      email: '',
      nama_usaha: '',
      type_pajak:'',
      ...record,
    });
    setEditingKey(record.key);
  };
 
  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
    //   const response = await fetch(
    //     "https://api.raspi-geek.com/v1/merchants",
    //     {
    //         method: "PATCH",
    //         headers: {
    //             'x-api-key': `${apiKey}`,
    //             'content-type': 'application/json',
    //             'Authorization': `Bearer ${token}`
    //         },
    //         body: JSON.stringify(row),
    //     }
    // );


      const newData = [...dataTable];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setDataTable(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setDataTable(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
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
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    }
  ];
  useEffect(() => {
    getListDevice();
  }, []);
  useEffect(() => {
    getListDevice();
    const interval = setInterval(() => {
      getListDevice()
    }, 10000)


    return () => clearInterval(interval)
  }, []);

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
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'device_id' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Widget styleName="gx-order-history"
      title={
        <h2 className="h2 gx-text-capitalize gx-mb-0">
          Daftar Device / Agent</h2>
      }
    >
      <div className="gx-table-responsive">
        {/* <Table className="gx-table-no-bordered" columns={columns} dataSource={data} pagination={false} bordered={false}
        size="small" /> */}
        <Form form={form} component={false}>
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
        </Form>
      </div>
    </Widget>
  );
};

export default ListDeviceAgent;
