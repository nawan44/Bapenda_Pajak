import React, { useState, useEffect } from "react";
import Widget from "components/Widget/index";
import { Row, Col, Typography, Button, Form, Input, Select, Table } from "antd";
import { DatePicker, Space } from "antd";
import jwtDecode from "jwt-decode";
import * as moment from "moment";
import ConvertPdf from "./convertPdf";
import ConvertExcel from "./convertExcel";
const Search = Input.Search;

const { RangePicker } = DatePicker;
const Option = Select.Option;
const FormItem = Form.Item;
// const CurrencyCalculator = () => {
//   function handleChange(value) {
//   }

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
];

const dataDummy = [
  {
    key: "1",
    tgl_transaksi: "1 Maret 2022",
    nik: "32100000000000",
    nama_usaha: "Kyriad Metro Cipulir - Restoran Nusantara",
    type_pajak: "Restoran",
    nominal_transaksi: "175000.00",
    nominal_pajak: "75000,00",
    nominal_nett: "100000.00",
  },
  {
    key: "2",
    tgl_transaksi: "1 Februari 2022",
    nik: "32100000000000",
    nama_usaha: "Kyriad Metro Cipulir - Restoran Nusantara",
    type_pajak: "Restoran",
    nominal_transaksi: "175000.00",
    nominal_pajak: "75000,00",
    nominal_nett: "100000.00",
  },
  {
    key: "3",
    tgl_transaksi: "15 Maret 2022",
    nik: "32100000000000",
    nama_usaha: "Kyriad Metro Cipulir - Restoran Nusantara",
    type_pajak: "Restoran",
    nominal_transaksi: "175000.00",
    nominal_pajak: "75000,00",
    nominal_nett: "100000.00",
  },
  {
    key: "4",
    tgl_transaksi: "20 Februari 2022",
    nik: "32100000000000",
    nama_usaha: "Kyriad Metro Cipulir - Restoran Nusantara",
    type_pajak: "Restoran",
    nominal_transaksi: "175000.00",
    nominal_pajak: "75000,00",
    nominal_nett: "100000.00",
  },
  {
    key: "5",
    tgl_transaksi: "30 Januari 2022",
    nik: "32100000000000",
    nama_usaha: "Kyriad Metro Cipulir - Restoran Nusantara",
    type_pajak: "Restoran",
    nominal_transaksi: "175000.00",
    nominal_pajak: "75000,00",
    nominal_nett: "100000.00",
  },
];
const dateFormat = "YYYY-MM-DD";

const Transaction = () => {
  const [listDevice, setListDevice] = useState();
  const [responFilter, setResponFilter] = useState();
  const [form] = Form.useForm();
  const [formOk, setFormOk] = useState(false);
  const [totalRow, setTotalRow] = useState();
  const [page, setPage] = useState(1);
  const [click, setClick] = useState(false);
  const [fromDate, setFromDate] = useState(
    moment().subtract(1, "months").format("YYYY-MM-DD")
  );
  const [onSelected, setOnSelected] = useState(false)
  const [toDate, setToDate] = useState(moment().format("YYYY-MM-DD"));
  const [nik, setNik] = useState();
  const [typePajak, setTypePajak] = useState();
  const onChangeDateRange = (date, datesString) => {
    setFromDate(datesString[0]);
    // setFromDate(datesString[1]);
    //More code
  };

  const onResetClick = () => {
    setFromDate("2000-01-01");
    setToDate("2000-01-02");
  };
  console.log("page", page);

  const onChange = (page) => {
    console.log("onchange page", page);
    setPage(page.current);
    setOnSelected(true)
    setClick(true);
    handleFinish();
  };
  // console.log(
  //   " 3,'months').format('YYYY-MM-DD')",
  //   moment().subtract(3, "months").format("YYYY-MM-DD")
  // );

  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  // useEffect(() => {
  //   setButtonPage(page);
  // }, [page]);
  useEffect(() => {
    getListDevice();
  }, []);

  
  const getListDevice = async (dataLatest) => {
    const decoded = jwtDecode(localStorage.token);
    const apiKey = decoded["api-key"];
    const token = localStorage.getItem("token");
    const headers = {
      "x-api-key": `${apiKey}`,
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const response = await fetch(
      "https://api.raspi-geek.com/v1/merchants",

      { method: "GET", headers }
    );
    const ajson = await response.json();
    setListDevice(ajson.Records);
  };
  // console.log("listDevice",listDevice)
  const dataMerchant = listDevice?.map((row, index) => ({
    nik: row[2].stringValue,
    nama_usaha: row[4].stringValue,
  }));
  const dataFilter = responFilter?.map((row, index) => ({
    tgl_transaksi: row[1].stringValue,
    nik: row[2].stringValue,
    nama_usaha: row[3].stringValue,
    type_pajak: row[4].stringValue,
    nominal_transaksi: formatter.format(row[5].stringValue),
    nominal_pajak: formatter.format(row[6].stringValue),
    nominal_nett: formatter.format(row[7].stringValue),
  }));
  // console.log("dataFilter",dataFilter)
  function changeTypePajak(value) {
    setTypePajak(value);
  }

  function onChangeNik(value, id) {
    setNik(id.id);
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
      return `https://api.raspi-geek.com/v1/transactions?page=${page}&npwp=${nik}`;
    } else if (!nik && typePajak) {
      return `https://api.raspi-geek.com/v1/transactions?page=${page}&type_pajak=${typePajak}`;
    } else if (nik && typePajak) {
      return `https://api.raspi-geek.com/v1/transactions?page=${page}&npwp=${nik}&type_pajak=${typePajak}`;
    } else if (!nik && !typePajak) {
      return `https://api.raspi-geek.com/v1/transactions?page=${page}`;
    }
  };
  useEffect(() => {
    handleFinish();
    // onChange()
  },  []);
  useEffect(() => {
    if(onSelected == true){
    handleFinish();}
    // onChange()
  },  [onSelected]);
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
        setTotalRow(res.TotalNumRows);
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
  console.log("respon FIlter", responFilter);
  const reset = () => {
    setFromDate(moment().subtract(1, "months").format("YYYY-MM-DD"));
    setToDate(moment().format("YYYY-MM-DD"));
    setFormOk(false);
    setNik(null);
    setTypePajak(null);
  };
  return (
    <>
      <Widget styleName="gx-order-history  gx-p-4 ">
        <p>
          <h1 className="gx-mb-2 gx-text-primary gx-font-weight-medium gx-fs-xxl">
            Filter Data{" "}
          </h1>{" "}
        </p>

        <Form
          layout="inline"
          className="gx-form-inline-label-up gx-form-inline-currency "
          style={{ marginBottom: "70px" }}
          form={form}
          onFinish={handleFinish}
          // initialValues={{
          //     nik: "", owner: "", nik: "", email: "", nama_usaha: "",
          //     kelurahan: "", alamat: "", kategori: "", data_source: ""
          // }}
        >
          <FormItem label="Tanggal" className="gx-form-item-one-third">
            <Space direction="vertical" style={{ width: 250 }} size={12}>
              {/* <Button
                onClick={() =>
                  setDateRange(dateRange.map((d) => d.add(1, "w")))
                }
              >
                Add 7 days
              </Button> */}
              <RangePicker
                onChange={onChangeDateRange}
                disabledDate={disabledDate}
                //  onChange={(date, dateString) => onChangeDateRange(date, dateString)}
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

          <FormItem label="NIK" className="gx-form-item-one-third">
            <Select
              value={nik}
              showSearch
              style={{ width: 350 }}
              placeholder="Select NIK"
              optionFilterProp="children"
              onChange={onChangeNik}
              onFocus={onFocus}
              onBlur={onBlur}
              onSearch={onSearch}
              filterOption={(input, option) =>
                option.id.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              allowClear
            >
              {dataMerchant?.map((p) => (
                <Option id={p.nik} value={p.nama_usaha}>
                  {p.nik} - {p.nama_usaha}{" "}
                </Option>
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
                onClick={() => {form.submit() ; setClick(true)}   
                }
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
        {click == true && (
          <div className="gx-table-responsive">
            <Row style={{ float: "right" }}>
              <ConvertPdf dataFilter={dataFilter} />
              <ConvertExcel dataFilter={dataFilter} />
            </Row>

            <Table
              className="gx-table-no-bordered"
              columns={columns}
              dataSource={dataFilter}
              // pagination={true}
              bordered={false}
              size="small"
              // current={page}
              pagination={{
                showTotal: (total, range, page) => {
                  console.log({ total, range });
                },

                current: page,
                total: 100,
                pageSize: 10,

                // defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30']
              }}
              onChange={(p) => onChange(p)}
              // onSelected ={() => setOnSelected(!onSelected)}
              // onChange={(...args) => {
              //   console.log("args",...args);
                
              // } }
            />
          </div>
        )}
      </Widget>
    </>
  );
};

export default Transaction;
