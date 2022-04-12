import React, { useState, useEffect } from "react";
import Widget from "components/Widget/index";
import { Row, Modal, Button, Form, Input, Select, Table } from "antd";
import { DatePicker, Space } from "antd";
import jwtDecode from "jwt-decode";
import * as moment from "moment";
// import ConvertPdf from "./convertPdf";
import ConvertExcel from "./convertExcel";
import "../../assets/styles/table.css";
// import ReactJs from "./reactjs";
// import JSONPretty from "react-json-pretty";
// import { JsonTable } from "react-json-to-html";
// import FileViewer from 'react-file-viewer';
// import ReactFileReader from "react-file-reader";
import $ from 'jquery';

// const Search = Input.Search;

const { RangePicker } = DatePicker;
const Option = Select.Option;
const FormItem = Form.Item;

const dateFormat = "YYYY-MM-DD";

const Transaction = () => {
  const [listDevice, setListDevice] = useState();
  const [responFilter, setResponFilter] = useState();
  const [form] = Form.useForm();
  const [formOk, setFormOk] = useState(false);
  const [totalRow, setTotalRow] = useState();
  const [pageState, setPageState] = useState(1);
  const [changePage, setChangePage] = useState(1);
  const [click, setClick] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const [fromDate, setFromDate] = useState(
    moment().subtract(1, "months").format("YYYY-MM-DD")
  );
  const [key, setKey] = useState(false);
  const [toDate, setToDate] = useState(moment().format("YYYY-MM-DD"));
  const [nik, setNik] = useState();
  const [typePajak, setTypePajak] = useState();

  const [files, setFiles] = useState("");

  const onChangeDateRange = (date, datesString) => {
    setFromDate(datesString[0]);
    setToDate(datesString[1]);
    //More code
  };

  // const onResetClick = () => {
  //   setFromDate("2000-01-01");
  //   setToDate("2000-01-02");
  // };
  const renderRawdata = () => {
    if (selectedRecord?.data_source === "PDC") {
      return "PDF";
    } else if (selectedRecord?.data_source === "Agent") {
      return "PDF";
    } else if (selectedRecord?.data_source === "POS APP") {
      return "JSON";
    } else if (selectedRecord?.data_source === "BDC") {
      return "JSON";
    } else if (selectedRecord?.data_source === "SDC") {
      return "JSON";
    } else {
      return false;
    }
  };

  const onChange = (page) => {
    setPageState(page.current);
    setKey(true);
    setClick(true);
    handleFinish();
  };

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  useEffect(() => {
    // setPageState(page.current);
    if (key == true) {
      setChangePage(pageState);
    } else {
      setChangePage(1);
    }
  }, [pageState]);
  useEffect(() => {
    getListDevice();
  }, []);
  useEffect(() => {
    handleFinish();
    // onChange()
  }, []);
  useEffect(() => {
    handleFinish();
  }, [changePage]);

  useEffect(() => {
    setFiles(selectedRecord?.raw_data);
  }, []);

  const getListDevice = async () => {
    const decoded = jwtDecode(localStorage.token);
    const apiKey = decoded["api-key"];
    const headers = {
      "x-api-key": `${apiKey}`,
      "content-type": "application/json",
    };
    const response = await fetch(
      "https://api.raspi-geek.com/v1/npwp",

      { method: "GET", headers }
    );
    const ajson = await response.json();
    setListDevice(ajson.Records);
  };

  const dataMerchant = listDevice?.map((item) => ({
    nik: item[0].stringValue,
  }));

  const dataFilter = responFilter?.map((row, index) => ({
    key:index,
    tgl_transaksi: row[1].stringValue,
    nik: row[8].stringValue,
    nama_usaha: row[3].stringValue,
    type_pajak: row[4].stringValue,
    nominal_transaksi: formatter.format(row[5].stringValue),
    nominal_pajak: formatter.format(row[6].stringValue),
    nominal_nett: formatter.format(row[7].stringValue),
    raw_data: row[9].stringValue,
    data_source: row[10].stringValue,
  }));
  function changeTypePajak(value) {
    setTypePajak(value);
  }

  function onChangeNik(value, id, p) {
    // console.log("onChangeNiK", id.key)
    setNik(value);
  }

  function onSearch(val) {
    // console.log("search:", val);
  }
  function onBlur() {
    // console.log("blur");
  }

  function onFocus() {
    // console.log("focus");
  }
  const url = () => {
    if (nik && !typePajak) {
      return `https://api.raspi-geek.com/v1/transactions?page=${changePage}&npwp=${nik}`;
    } else if (!nik && typePajak) {
      return `https://api.raspi-geek.com/v1/transactions?page=${changePage}&type_pajak=${typePajak}`;
    } else if (nik && typePajak) {
      return `https://api.raspi-geek.com/v1/transactions?page=${changePage}&npwp=${nik}&type_pajak=${typePajak}`;
    } else if (!nik && !typePajak) {
      return `https://api.raspi-geek.com/v1/transactions?page=${changePage}`;
    }
  };

  const handleFinish = async (values, page) => {
    // if (click == true) {
    try {
      const decoded = jwtDecode(localStorage.token);
      const apiKey = decoded["api-key"];
      const response = await fetch(url(), {
        method: "POST",
        headers: {
          "x-api-key": `${apiKey}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          startdate: fromDate,
          enddate: toDate,
        }),
      });
      const res = await response.json();
      setResponFilter(res.Records);
      setFormOk(true);
      setTotalRow(res.totalNumRecords);
      // setPage(page.current);
      // success();
      // history.push("/dashboard")
    } catch (err) {
      // console.log("error", err.message);
    }
    // }
  };
  function disabledDate(current) {
    return current > moment() || current < moment().subtract(3, "months");
  }
  const reset = () => {
    setFromDate(moment().subtract(1, "months").format("YYYY-MM-DD"));
    setToDate(moment().format("YYYY-MM-DD"));
    setFormOk(false);
    setNik(null);
    setTypePajak(null);
  };
  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    // console.log("Clicked cancel button");
    setVisible(false);
  };
  const showModal = () => {
    setVisible(true);
  };

  const [dataArr,setDataArr]=useState();
  useEffect(()=>{
      getDataArr()
    },[])
  const  getDataArr = async ()=> {
    try { 
      // if (selectedRecord?.raw_data){
      // let response = selectedRecord?.raw_data
      // let responseJson = response.json();
      // // return responseJson.movies;
      // console.log("response >>>>",response)
      // console.log("responseJson ,,,,,,",responseJson)
      
      // setDataArr(responseJson)
    //  } catch(error) {
    //   console.error(error);
    // }

    // if (selectedRecord?.raw_data){

    const decoded = jwtDecode(localStorage.token);
    const apiKey = decoded["api-key"];
    const headers = {
      "x-api-key": `${apiKey}`,
      "content-type": "application/json",
    };
    const response = await fetch(
      selectedRecord?.raw_data,

      { method: "GET", headers }
    );
    const res = await response.json();
    console.log("resss", res)
    setDataArr(res);
  } catch(error) {
      console.error(error);
    }
  
  }
  console.log("dataArr", dataArr)
  const handleChange = (e) => {
    const content = document.querySelector(".content");
    const [file] = document.querySelector("input[type=file]").e;
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      () => {
        // this will then display a text file
        content.innerText = reader.result;
      },
      false
    );

    if (file) {
      reader.readAsText(file);
    }
  };
  const [arr, setArr] =useState([])
// console.log("arr", "https://sourceforge.net/projects/kaais/files/stats/json?start_date=2013-08-18&end_date=2018-04-19")
// const aku = [
// selectedRecord?.raw_data
// ]

// var km = "https://sourceforge.net/projects/kaais/files/stats/json?start_date=2013-08-18&end_date=2018-04-19"
// var km = selectedRecord?.raw_data 

// const kk = $.ajax({
//     method: "GET",
//     cache: false,
//     url: km,
//     success: function(data) {
//       document.getElementById('output').innerHTML = data;
//     },
//     error: function(error) {
//       //What do you want to do with the error?
//     },
//   });
  
// console.log("kk", kk)
  const columns = [
    {
      title: "Tanggal Transaksi",
      dataIndex: "tgl_transaksi",
    },
    {
      title: "NIK",
      dataIndex: "nik",
    },
    {
      title: "Nama Usaha",
      dataIndex: "nama_usaha",
    },
    {
      title: "Type Pajak",
      dataIndex: "type_pajak",
    },
    {
      title: "Nominal Transaksi",
      dataIndex: "nominal_transaksi",
    },
    {
      title: "Nominal Pajak",
      dataIndex: "nominal_pajak",
    },
    {
      title: "Nett",
      dataIndex: "nominal_nett",
    },
    {
      title: "Raw Data",
      dataIndex: "aksi",
      render: (text, record) => {
        return (
          <Button
            // icon={<FormOutlined />}
            id={record.id}
            onClick={(e) => {
              showModal();
              setSelectedRecord(record);
              setArr(record.raw_data)
              console.log("record?", record?.raw_data.json())
              //   fetch(`${record.raw_data}`).then((data) => {
              //     // setAA(data)
              //     console.log("setAA", data)
              // })
              // handleChange(record.raw_data)
            }}
            size="large"
          >
            Raw Data
          </Button>
        );
      },
    },
  ];
  // const json = require(`./${selectedRecord?.raw_data}`);

  // const openFile = (evt) => {
  //   function previewFile() {
  //     const content = document.querySelector(".content");
  //     const [file] = document.querySelector("input[type=file]").files;
  //     const reader = new FileReader();

  //     reader.addEventListener(
  //       "load",
  //       () => {
  //         // this will then display a text file
  //         content.innerText = reader.result;
  //       },
  //       false
  //     );

  //     if (file) {
  //       reader.readAsText(file);
  //     }
  //   }
  // };
  // const [state, setState] = useState()
  // var data = require(selectedRecord?.raw_data);
  // const handleFiles = (files) => {
  //   var reader = new FileReader();
  //   reader.onload = e => {
  //     // Use reader.result
  //     setState({ data: selectedRecord?.raw_data});
  //   };
  //   reader.readAsText(files[0]);
  // };

  // const [data, setData] = useState();

  // useEffect(() => {
  //   async function getData() {
  //     fetch(selectedRecord?.raw_data
  //     )
  //       .then(function (response) {
  //         return response.text();
  //       })
  //       .then(function (txt) {
  //         // let d = txt.replace(/Brand/g, `"Brand"`);
  //         // d = d.replace(/Model/g, `"Model"`);
  //         d = JSON.parse(d);
  //         setData(d);
  //       });
  //   }
  //   getData();
  // }, []);
  // const aa  =() =>{
  //   var flickerAPI = selectedRecord?.raw_data;
  //   $.getJSON( flickerAPI, {
  //     tags: "mount rainier",
  //     tagmode: "any",
  //     format: "json"
  //   })
  //     .done(function( data ) {
  //       $.each( data.items, function( i, item ) {
  //         $( "<img>" ).attr( "src", item.media.m ).appendTo( "#images" );
  //         if ( i === 3 ) {
  //           return false;
  //         }
  //       });
  //     });
  // };
  // console.log("aa", aa)

  // const getData=()=>{
  //   if(selectedRecord?.raw_data){
  //     fetch(`${selectedRecord?.raw_data}`
  //   ,{
  //     headers : { 
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json'
  //      }
  //   }
  //   )
  //     .then(function(response){
  //       console.log(response)
  //       return response.json();
  //     })
  //     .then(function(myJson) {
  //       console.log(myJson);
  //       setData(myJson)
  //     });
  //   }
  // }
  // useEffect(()=>{
  //   getData()
  // },[])
  return (
    <>
      <Widget styleName="gx-order-history  gx-p-4 ">
          <h1 className="gx-mb-2 gx-text-primary gx-font-weight-medium gx-fs-xxl">
            Filter Data{" "} Build 1
          </h1>{" "}
        <Form
          layout="inline"
          className="gx-form-inline-label-up gx-form-inline-currency "
          style={{ marginBottom: "70px" }}
          form={form}
          onFinish={handleFinish}
        >
          <FormItem label="Tanggal" className="gx-form-item-one-third">
            <Space direction="vertical" style={{ width: 250 }} size={12}>
              <RangePicker
                onChange={onChangeDateRange}
                disabledDate={disabledDate}
                value={[
                  moment(fromDate, dateFormat),
                  moment(toDate, dateFormat),
                ]}
              />
            </Space>
          </FormItem>
          <FormItem label="Type Pajak" className="gx-form-item-one-third">
            <Select
              onChange={changeTypePajak}
              placeholder="Select Type Pajak"
              style={{ width: 150 }}
              allowClear
              value={typePajak}
            >
              <Option value="Restoran">Restoran</Option>
              <Option value="Hotel">Hotel</Option>
              <Option value="Parkir">Parkir</Option>
            </Select>
          </FormItem>

          <FormItem label="NIK / NPWP" className="gx-form-item-one-third">
            <Select
              id={"select"}
              value={nik}
              showSearch
              style={{ width: 350 }}
              placeholder="Select NIK / NPWP"
              optionFilterProp="children"
              // onChange={(p) => onChangeNik(p)}

              onChange={onChangeNik}
              onFocus={onFocus}
              onBlur={onBlur}
              onSearch={onSearch}
              // filterOption={(input, option) =>
              //   option.id.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
              //   option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
              // }
              allowClear
            >
              {dataMerchant?.map((p) => (
                <Option key={p.nik}>{p.nik}</Option>
              ))}
            </Select>
          </FormItem>
          <Row>
            {" "}
            <FormItem className="gx-d-block gx-mb-1">
              <Button
                style={{ marginTop: "15px" }}
                className="gx-mb-0"
                type="primary"
                onClick={() => {
                  form.submit();
                  setClick(true);
                }}
              >
                Cari Data
              </Button>
            </FormItem>
            <FormItem className="gx-d-block gx-mb-1">
              <Button
                style={{ marginTop: "15px" }}
                className="gx-mb-0"
                type="danger"
                onClick={reset}
              >
                Reset
              </Button>
            </FormItem>
          </Row>
        </Form>
        <div id="output">NO DATA</div>

        {click == true && (
          <div className="gx-table-responsive">
            <Row style={{ float: "right" }}>
              {/* <ConvertPdf dataFilter={dataFilter} /> */}
              <ConvertExcel
                dataFilter={dataFilter}
                typePajak={typePajak}
                nik={nik}
                changePage={changePage}
                fromDate={fromDate}
                toDate={toDate}
              />
            </Row>

            <Table
              className="gx-table-no-bordered"
              columns={columns}
              dataSource={dataFilter}
              bordered={false}
              size="small"
              pagination={{
                showTotal: (total, range, page) => `Total: ${total}`,

                current: pageState,
                total: totalRow,
                showSizeChanger: false,
              }}
              onChange={(p) => onChange(p)}
            />
          </div>
        )}
        {renderRawdata() === "JSON" && (
          <Modal
            title="Raw Data"
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
          {/* <ReactJs rawData ={aku()} /> */}
            {/* { kk.responseJSON()} */}
            {/* <JSONPretty id="json-pretty" data={selectedRecord?.raw_data}></JSONPretty> */}
            {/* <JsonTable json={selectedRecord?.raw_data } /> */}
            {/* <input type="file" onChange={handleChange} /> */}

            <div dangerouslySetInnerHTML={{ __html: dataArr}} />

            {/* <JSONPretty id="json-pretty" data={selectedRecord?.raw_data}></JSONPretty> */}
            {/* {JSON.parse(selectedRecord?.raw_data)} */}
          
          
            {/* {selectedRecord?.raw_data && (
              <div>
            <iframe src={selectedRecord?.raw_data} frameborder="0" width="300px" height="400px"/>
            <a href={selectedRecord?.raw_data}>Download JSON </a>
              </div>
            )} */}

            {/* {data} */}

            {/* <JSONPretty id="json-pretty" style={{fontSize: "1.1em"}} data={JSON.stringify(selectedRecord?.raw_data)} mainStyle="padding:1em" valueStyle="font-size:1.5em"></JSONPretty> */}
            {/* <div  >{selectedRecord?.raw_data.renderHTML()}</div> */}
            {/* <div dangerouslySetInnerHTML={{ __html: selectedRecord?.raw_data }} /> */}

            {/* <embed src={selectedRecord?.raw_data} frameborder="0" width="100%" height="400px"/> */}
            {/* <iframe src={JSON.stringify(selectedRecord?.raw_data)} frameborder="0" width="300px" height="400px"/> */}

            {/* <ReactJsonViewer data={selectedRecord?.raw_data} /> */}
            {/* {JSON.stringify(selectedRecord?.raw_data, null, 2) } */}
            {/* <JSONViewer
        json={selectedRecord?.raw_data}
      /> */}
          </Modal>
        )}

        {renderRawdata() === "PDF" && (
          <Modal
            title="Raw Data"
            visible={visible}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            {/* <Document file={selectedRecord?.raw_data} /> */}
            <iframe
              src={selectedRecord?.raw_data}
              frameborder="0"
              width="100%"
              height="400px"
            />
            {/* <embed src={selectedRecord?.raw_data} frameborder="0" width="100%" height="400px"/> */}
          </Modal>
        )}
      </Widget>
    </>
  );
};

export default Transaction;
