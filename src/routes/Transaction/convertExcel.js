import React, { useState } from "react";
// import XLSX from "xlsx";
import * as XLSX from "xlsx";
import { Button, Modal } from "antd";
import * as moment from "moment";
import "moment/locale/id";
import "../../assets/styles/table.css";
import jwtDecode from "jwt-decode";

const dataDummy = [
  {
    key: "1",
    tgl_transaksi: "1 Maret 2022",
    merchant_id: "DEJARDIN0001",
    nama_usaha: "Kyriad Metro Cipulir - Restoran Nusantara",
    type_pajak: "Restoran",
    nominal_transaksi: "175000.00",
    nominal_pajak: "75000,00",
    nominal_nett: "100000.00",
  },
  {
    key: "2",
    tgl_transaksi: "1 Februari 2022",
    merchant_id: "DEJARDIN0001",
    nama_usaha: "Kyriad Metro Cipulir - Restoran Nusantara",
    type_pajak: "Restoran",
    nominal_transaksi: "175000.00",
    nominal_pajak: "75000,00",
    nominal_nett: "100000.00",
  },
  {
    key: "3",
    tgl_transaksi: "15 Maret 2022",
    merchant_id: "DEJARDIN0001",
    nama_usaha: "Kyriad Metro Cipulir - Restoran Nusantara",
    type_pajak: "Restoran",
    nominal_transaksi: "175000.00",
    nominal_pajak: "75000,00",
    nominal_nett: "100000.00",
  },
  {
    key: "4",
    tgl_transaksi: "20 Februari 2022",
    merchant_id: "DEJARDIN0001",
    nama_usaha: "Kyriad Metro Cipulir - Restoran Nusantara",
    type_pajak: "Restoran",
    nominal_transaksi: "175000.00",
    nominal_pajak: "75000,00",
    nominal_nett: "100000.00",
  },
  {
    key: "5",
    tgl_transaksi: "30 Januari 2022",
    merchant_id: "DEJARDIN0001",
    nama_usaha: "Kyriad Metro Cipulir - Restoran Nusantara",
    type_pajak: "Restoran",
    nominal_transaksi: "175000.00",
    nominal_pajak: "75000,00",
    nominal_nett: "100000.00",
  },
];

const ConvertExcel = (props) => {
  const { dataFilter, fromDate, toDate } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [newPageUrl, setNewPageUrl] = useState();
  const showModal = (record) => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dataFilter);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workbook, "DataTransaksi.xlsx");
  };
  const convertMode0 = async (values, page) => {
    // if (click == true) {
    try {
      const decoded = jwtDecode(localStorage.token);
      const apiKey = decoded["api-key"];
      const response = await fetch(
        `https://api.raspi-geek.com/v1/exporter?mode=0`,
        {
          method: "POST",
          headers: {
            "x-api-key": `${apiKey}`,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            startdate: fromDate,
            enddate: toDate,
          }),
        }
      );
      const res = await response.json();
      // setResponFilter(res.Records);
      // setFormOk(true);
      // setTotalRow(res.totalNumRecords);
      showModal();
      setNewPageUrl(res);
      // if(res){
      // window.open(newPageUrl)}
      console.log("re", res);
      // setPage(page.current);
      // success();
      // history.push("/dashboard")
    } catch (err) {
      // console.log("error", err.message);
    }
    // }
  };
  return (
    <div>
      {" "}
      <Button
        variant="contained"
        className="button-export"
        // startIcon={<Description />}
        // onClick={exportExcel}
        onClick={convertMode0}
      >
        Export Data
      </Button>
      <Modal
        // dataRecord={dataRecord}
        title="Export Data"
        visible={isModalVisible}
        className="modal-export"
        footer={null}
        // onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="container-export">
          <Button
            // className="button-excel"
            className="btn btn-one"
            onClick={() => window.open(newPageUrl, "_blank")}
          >
            {" "}
            Export Excel
          </Button>
        </div>
        {/* <div className="container-button">
          <Button
            className="glow-on-hover"
            onClick={(e, record) => {
              setListData({
                aksiList: "editData",
                itemList: dataRecord
              })
            }} > Edit Data
          </Button>
        </div> */}
      </Modal>
    </div>
  );
};
export default ConvertExcel;
