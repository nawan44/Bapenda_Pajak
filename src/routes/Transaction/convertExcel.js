import React from "react";
// import XLSX from "xlsx";
import * as XLSX from 'xlsx';
import { Button, } from "antd";
import * as moment from "moment";
import 'moment/locale/id'
import "../../assets/styles/table.css"

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

const ConvertExcel = ( props) => {
  const {dataFilter} =props

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(dataFilter);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workbook, "DataTransaksi.xlsx");
    
  };

  return (
    <div>
      {" "}
      <Button
        variant="contained"
        className="button-excel"
        // startIcon={<Description />}
        onClick={exportExcel}
      >
        Export Excel
      </Button>
    </div>
  );


  
};
export default ConvertExcel;