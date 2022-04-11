import React from "react";
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { Button, } from "antd";
import * as moment from "moment";
import 'moment/locale/id'
import "../../assets/styles/table.css"


const ConvertPdf = ( props) => {
  const {dataFilter} =props

  const exportPDF = () => {
    // doc.setFontSize(15);
    // const marginLeft = 40;
    // const title = "Data Transaksi"; //Nanti tampil diatas
    const columns = [
      
        // "Tanggal Transaksi",
        // "Merchant ID",
        // "Nama Usaha",
        // "Type Pajak",
        // "Nominal Transasksi",
        // "Nominal Pajak",
        // "Nominal Nett"
        { title: "Tanggal Transaksi", dataKey: "tgl_transaksi" },
        { title: "Merchant ID", dataKey: "merchant_id" },
        { title: "Nama Usaha", dataKey: "nama_usaha" },

        { title: "Tipe Pajak", dataKey: "type_pajak" },
        { title: "Nominal Transasksi", dataKey: "nominal_transaksi" },
        { title: "Nominal Pajak", dataKey: "nominal_pajak" },

        { title: "Nominal Nett", dataKey: "nominal_nett" },
    ];

    const rows = dataFilter?.map((elt) => ({
      tgl_transaksi : elt?.tgl_transaksi,
      merchant_id:    elt?.merchant_id,
      nama_usaha:    elt?.nama_usaha,
      type_pajak:     elt?.type_pajak,
      nominal_transaksi:      elt?.nominal_transaksi,
      nominal_pajak:     elt?.nominal_pajak,
      nominal_nett:     elt?.nominal_nett
          }))

    // let content = {
    //   startY: 50,
    //   head: headers,
    //   body: data,
    // };

    // doc.text(title, marginLeft, 40);
    // doc.autoTable(content);
    // doc.save("report.pdf");
    var doc = new jsPDF("l",  "pt");

      // doc.text(title, marginLeft, 40);
    // doc.autoTable({
    //   head: headers,
    //   body: data,
    // })
    doc.autoTable( {
      columns:columns,
      body:rows,
      startY: 60,

      margin: { horizontal: 10 },
      styles: { overflow: "linebreak" },
      bodyStyles: { valign: "top" },
      columnStyles: {  cellWidth: "wrap"  },
      theme: "striped",
      showHead: "everyPage",
      didDrawPage: function (elt) {
        // Header
        doc.setFontSize(16);
        doc.setTextColor("#161C22");
        // doc.setFontWeight("bold")
        doc.text("Data Transaksi", elt.settings.margin.top, 25);
        // doc.text("PT. Emtres Indonesia", 265, 34);

        // Footer
        let str = "" + doc.internal.getNumberOfPages();
        doc.setFontSize(10);

        // jsPDF 1.4+ uses getWidth, <1.4 uses .width
        let pageSize = doc.internal.pageSize;
        let pageHeight = pageSize.height
          ? pageSize.height
          : pageSize.getHeight();
        doc.text(`Tanggal Cetak : ${moment().format("DD MMMM YYYY HH:mm:ss")}`, elt.settings.margin.left, pageHeight - 10);
        doc.text(575, 830, str);
      }
    });
    doc.save('transasksi.pdf')
  };

  return (
    <div>
      {" "}
      <Button
        variant="contained"
        className="button-pdf"
        // startIcon={<Description />}
        onClick={exportPDF}
      >
        Export PDF
      </Button>
    </div>
  );


  
};
export default ConvertPdf;