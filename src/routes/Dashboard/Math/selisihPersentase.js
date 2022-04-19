import React from "react";
import {
  CaretUpOutlined,
  CaretDownOutlined,
  PauseOutlined,
} from "@ant-design/icons";

function SelisihPresentase({
  objToday,
  moneyToday,
  moneyYesterday,
  moneyThisMonth,
  moneyLastMonth,
  objBulanIni,
  moneyThisYear,
  moneyLastYear,
  objTahunIni,
  transactionToday,
  transactionYesterday,
  objTransactionToday,
  transactionThisMonth,
  transactionLastMonth,
  objTransactionThisMonth,
  transactionThisYear,
  transactionLastYear,
  objTransactionThisYear /*  */,
}) {


  const persentasePendapatanHariIni = () => {
    if (moneyYesterday === undefined || moneyToday === undefined) {
      return "0";
    } else {
      if (moneyToday > moneyYesterday) {
        return (
          <div>
            <span className="persen-up">
              {(100 *
                Math.abs((moneyYesterday - moneyToday) / moneyYesterday)).toFixed(0) +
                "%"}
            </span>
            <CaretUpOutlined className="icon-up" />
          </div>
        );
      } else if (moneyToday < moneyYesterday) {
        return (
          <div>
            <span className="persen-down">
              {(100 *
                Math.abs((moneyYesterday - moneyToday) / moneyYesterday)).toFixed(
                  0
                ) +
                "%"}
            </span>{" "}
            <CaretDownOutlined className="icon-down" />
          </div>
        );
      } else if (moneyToday === moneyYesterday) {
        return (
          <div>
            <span className="persen-up">
              {(100 *
                Math.abs((moneyYesterday - moneyToday) / moneyYesterday)).toFixed(
                  0
                ) +
                "%"}
            </span>
            <PauseOutlined rotate={90} className="icon-up" />
          </div>
        );
      } else {
        return "Tidak Ada Transaksi";
      }
    }
  };

  const persentasePendapatanBulanIni = () => {
    if (moneyLastMonth === undefined || moneyThisMonth === undefined) {
      return "0";
    } else {
      if (moneyThisMonth > moneyLastMonth) {
        return (
          <div>
            <span className="persen-up">
              {(100 *
                Math.abs(
                  (moneyLastMonth - moneyThisMonth) / moneyLastMonth
                )).toFixed(0) +
                "%"}
            </span>
            <CaretUpOutlined className="icon-up" />
          </div>
        );
      } else if (moneyThisMonth < moneyLastMonth) {
        return (
          <div>
            <span className="persen-down">
              {(100 *
                Math.abs(
                  (moneyLastMonth - moneyThisMonth) / moneyLastMonth
                )).toFixed(0) +
                "%"}
            </span>{" "}
            <CaretDownOutlined className="icon-down" />
          </div>
        );
      } else if (moneyThisMonth === moneyLastMonth) {
        return (
          <div>
            <span className="persen-up">
              {(100 *
                Math.abs(
                  (moneyLastMonth - moneyThisMonth) / moneyLastMonth
                ).toFixed(0)) +
                "%"}
            </span>
            <PauseOutlined rotate={90} className="icon-up" />
          </div>
        );
      } else {
        return "Tidak Ada Transaksi";
      }
    }
  };
  const persentasePendapatanTahunIni = () => {
    if (moneyLastYear === undefined || moneyThisYear === undefined) {
      return "0";
    } else {
      if (moneyThisYear > moneyLastYear) {
        return (
          <div>
            <span className="persen-up">
              {(100 *
                Math.abs(
                  (moneyLastYear - moneyThisYear) / moneyLastYear
                )).toFixed(0) +
                "%"}
            </span>
            <CaretUpOutlined className="icon-up" />
          </div>
        );
      } else if (moneyThisYear < moneyLastYear) {
        return (
          <div>
            <span className="persen-down">
              {(100 *
                Math.abs(
                  (moneyLastYear - moneyThisYear) / moneyLastYear
                )).toFixed(0) +
                "%"}
            </span>{" "}
            <CaretDownOutlined className="icon-down" />
          </div>
        );
      } else if (moneyThisYear === moneyLastYear) {
        return (
          <div>
            <span className="persen-up">
              {(100 *
                Math.abs(
                  (moneyLastYear - moneyThisYear) / moneyLastYear
                )).toFixed(0) +
                "%"}
            </span>
            <PauseOutlined rotate={90} className="icon-up" />
          </div>
        );
      } else {
        return "Tidak Ada Transaksi";
      }
    }
  };

  const persentaseTransaksiHariIni = () => {
    if (transactionYesterday === undefined || transactionToday === undefined) {
      return "0";
    } else {
      if (transactionToday > transactionYesterday) {
        return (
          <div>
            <span className="persen-up">
              {(100 *
                Math.abs(
                  (transactionYesterday - transactionToday) / transactionToday
                )).toFixed(0) +
                "%"}
            </span>
            <CaretUpOutlined className="icon-up" />
          </div>
        );
      } else if (transactionToday < transactionYesterday) {
        return (
          <div>
            <span className="persen-down">
              {(100 *
                Math.abs(
                  (transactionYesterday - transactionToday) / transactionToday
                )).toFixed(0) +
                "%"}
            </span>{" "}
            <CaretDownOutlined className="icon-down" />
          </div>
        );
      } else if (transactionToday === transactionYesterday) {
        return (
          <div>
            <span className="persen-up">
              {(100 *
                Math.abs(
                  (transactionYesterday - transactionToday) / transactionToday
                )).toFixed(0) +
                "%"}
            </span>
            <PauseOutlined rotate={90} className="icon-up" />
          </div>
        );
      } else {
        return "Tidak Ada Transaksi";
      }
    }
  };

  const persentaseTransaksiBulanIni = () => {
    if (
      transactionLastMonth === undefined ||
      transactionThisMonth === undefined
    ) {
      return "0";
    } else {
      if (transactionThisMonth > transactionLastMonth) {
        return (
          <div>
            <span className="persen-up">
              {(100 *
                Math.abs(
                  (transactionLastMonth -
                    transactionThisMonth) /
                    transactionThisMonth
                )).toFixed(0) +
                "%"}
            </span>
            <CaretUpOutlined className="icon-up" />
          </div>
        );
      } else if (transactionThisMonth < transactionLastMonth) {
        return (
          <div>
            <span className="persen-down">
              {(100 *
                Math.abs(
                  (transactionLastMonth - transactionThisMonth) /
                    transactionThisMonth
                )).toFixed(0) +
                "%"}
            </span>{" "}
            <CaretDownOutlined className="icon-down" />
          </div>
        );
      } else if (transactionThisMonth === transactionLastMonth) {
        return (
          <div>
            <span className="persen-up">
              {(100 *
                Math.abs(
                  (transactionLastMonth - transactionThisMonth) /
                    transactionThisMonth
                )).toFixed(0) +
                "%"}
            </span>
            <PauseOutlined rotate={90} className="icon-up" />
          </div>
        );
      } else {
        return "Tidak Ada Transaksi";
      }
    }
  };
  const persentaseTransaksiTahunIni = () => {
    if (
      transactionLastYear === undefined ||
      transactionThisYear === undefined
    ) {
      return "0";
    } else {
      if (transactionThisYear > transactionLastYear) {
        return (
          <div>
            <span className="persen-up">
              {(100 *
                Math.abs(
                  (transactionLastYear - transactionThisYear) /
                    transactionThisYear
                )).toFixed(0) +
                "%"}
            </span>
            <CaretUpOutlined className="icon-up" />
          </div>
        );
      } else if (transactionThisYear < transactionLastYear) {
        return (
          <div>
            <span className="persen-down">
              {(100 *
                Math.abs(
                  (transactionLastYear - transactionThisYear) /
                    transactionThisYear
                )).toFixed(0) +
                "%"}
            </span>{" "}
            <CaretDownOutlined className="icon-down" />
          </div>
        );
      } else if (transactionThisYear === transactionLastYear) {
        return (
          <div>
            <span className="persen-up">
              {(100 *
                Math.abs(
                  (transactionLastYear - transactionThisYear) /
                    transactionThisYear
                )).toFixed(0) +
                "%"}
            </span>
            <PauseOutlined rotate={90} className="icon-up" />
          </div>
        );
      } else {
        return "Tidak Ada Transaksi";
      }
    }
  };

  return (
    <>
      {moneyToday && <span>{persentasePendapatanHariIni()}</span>}
      {/* {objBulanIni && <span>{persentasePendapatanBulanIni()}</span>}
      {objTahunIni && <span>{persentasePendapatanTahunIni()}</span>} */}
      {moneyThisMonth && <span>{persentasePendapatanBulanIni()}</span>}
      {moneyThisYear && <span>{persentasePendapatanTahunIni()}</span>}

      {transactionToday && <span>{persentaseTransaksiHariIni()}</span>}
      {transactionThisMonth && <span>{persentaseTransaksiBulanIni()}</span>}
      {transactionThisYear && <span>{persentaseTransaksiTahunIni()}</span>}

      {/* {objTransactionThisMonth && <span>{persentaseTransaksiBulanIni()}</span>}
      {objTransactionThisYear && <span>{persentaseTransaksiTahunIni()}</span>} */}
    </>
  );
}

export default SelisihPresentase;
