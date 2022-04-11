import React, { useState } from "react";
// import XLSX from "xlsx";
// import * as XLSX from "xlsx";
import { Button, Modal } from "antd";
import "../../assets/styles/table.css";
import jwtDecode from "jwt-decode";

const ConvertExcel = (props) => {
  const { dataFilter, fromDate, toDate, typePajak, nik, changePage } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [newPageUrl, setNewPageUrl] = useState();
  const showModal = (record) => {
    setIsModalVisible(true);
  };

  // const handleOk = () => {
  //   setIsModalVisible(false);
  // };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // const exportExcel = () => {
  //   const worksheet = XLSX.utils.json_to_sheet(dataFilter);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  //   //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
  //   //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
  //   XLSX.writeFile(workbook, "DataTransaksi.xlsx");
  // };
  const urlExportExcel = () => {
    if (nik && !typePajak) {
      return `https://api.raspi-geek.com/v1/exporter?mode=0?page=${changePage}&npwp=${nik}`;
    } else if (!nik && typePajak) {
      return `https://api.raspi-geek.com/v1/exporter?mode=0?page=${changePage}&type_pajak=${typePajak}`;
    } else if (nik && typePajak) {
      return `https://api.raspi-geek.com/v1/exporter?mode=0?page=${changePage}&npwp=${nik}&type_pajak=${typePajak}`;
    } else if (!nik && !typePajak) {
      return `https://api.raspi-geek.com/v1/exporter?mode=0?page=${changePage}`;
    }
  };
  const convertMode0 = async (values, page) => {
    // if (click == true) {
    try {
      const decoded = jwtDecode(localStorage.token);
      const apiKey = decoded["api-key"];
      const response = await fetch(
        urlExportExcel(),
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
