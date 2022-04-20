import React from "react";
import {
  UpCircleFilled,
  DownCircleFilled,
  PauseCircleFilled,
} from "@ant-design/icons";

function SelisihNominal({
  objToday,
  moneyToday,
  moneyYesterday,
  objBulanIni,
  moneyLastMonth,
  moneyThisMonth,
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
  objTransactionThisYear,
}) {
  const selisihTransaksiHariIni = () => {
    if (transactionYesterday === undefined || transactionToday === undefined) {
      return "0";
    } else {
      if (transactionToday > transactionYesterday) {
        return <UpCircleFilled className="icon-up" />;
      } else if (transactionToday < transactionYesterday) {
        return <DownCircleFilled className="icon-down" />;
      } else if (transactionToday === transactionYesterday) {
        return <PauseCircleFilled rotate={90} className="icon-same" />;
      } else {
        return "Tidak Ada Transaksi";
      }
    }
  };
  const selisihTransaksiBulanIni = () => {
    if (
      transactionThisMonth === undefined ||
      transactionLastMonth === undefined
    ) {
      return "0";
    } else {
      if (transactionThisMonth > transactionLastMonth) {
        return <UpCircleFilled className="icon-up" />;
      } else if (transactionThisMonth < transactionLastMonth) {
        return <DownCircleFilled className="icon-down" />;
      } else if (transactionThisMonth === transactionLastMonth) {
        return <PauseCircleFilled rotate={90} className="icon-same" />;
      } else {
        return "Tidak Ada Transaksi";
      }
    }
  };
  const selisihTransaksiTahunIni = () => {
    if (
      transactionThisYear === undefined ||
      transactionLastYear === undefined
    ) {
      return "0";
    } else {
      if (transactionThisYear > transactionLastYear) {
        return <UpCircleFilled className="icon-up" />;
      } else if (transactionThisYear < transactionLastYear) {
        return <DownCircleFilled className="icon-down" />;
      } else if (transactionThisYear === transactionLastYear) {
        return <PauseCircleFilled rotate={90} className="icon-same" />;
      } else {
        return "Tidak Ada Transaksi";
      }
    }
  };

  const selisihTransaksiHarian = () => {
    if (moneyToday === undefined || moneyYesterday === undefined) {
      return "0";
    } else {
      if (moneyToday > moneyYesterday) {
        return <UpCircleFilled className="icon-up" />;
      } else if (moneyToday < moneyYesterday) {
        return <DownCircleFilled className="icon-down" />;
      } else if (moneyToday === moneyYesterday) {
        return <PauseCircleFilled rotate={90} className="icon-same" />;
      } else {
        return "Tidak Ada Transaksi";
      }
    }
  };
  const selisihPendapatanBulanIni = () => {
    if (moneyThisMonth === undefined || moneyLastMonth === undefined) {
      return "0";
    } else {
      if (moneyThisMonth > moneyLastMonth) {
        return <UpCircleFilled className="icon-up" />;
      } else if (moneyThisMonth < moneyLastMonth) {
        return <DownCircleFilled className="icon-down" />;
      } else if (moneyThisMonth === moneyLastMonth) {
        return <PauseCircleFilled rotate={90} className="icon-same" />;
      } else {
        return "Tidak Ada Transaksi";
      }
    }
  };
  const selisihPendapatanTahunIni = () => {
    if (moneyThisYear === undefined || moneyLastYear === undefined) {
      return "0";
    } else {
      if (moneyThisYear > moneyLastYear) {
        return <UpCircleFilled className="icon-up" />;
      } else if (moneyThisYear < moneyLastYear) {
        return <DownCircleFilled className="icon-down" />;
      } else if (moneyThisYear === moneyLastYear) {
        return <PauseCircleFilled rotate={90} className="icon-same" />;
      } else {
        return "Tidak Ada Transaksi";
      }
    }
  };
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });

  return (
    <>
      {moneyThisMonth && (
        <div style={{ height: "30px" }}>
          <span style={{ margin: "10px 0 0 0" }}>
            {selisihPendapatanBulanIni()}
          </span>
          {moneyThisMonth < moneyLastMonth ? (
            <span className="selisih-down">
              {moneyLastMonth === undefined
                ? "Tidak Ada Transaksi"
                : formatter.format(moneyThisMonth - moneyLastMonth)}
            </span>
          ) : (
            <span className="selisih-up">
              {moneyThisMonth === undefined
                ? "Tidak Ada Transaksi"
                : formatter.format(moneyThisMonth - moneyLastMonth)}
            </span>
          )}
        </div>
      )}
      {moneyToday && (
        <div style={{ height: "30px" }}>
          <span style={{ margin: "10px 0 0 0" }}>
            {selisihTransaksiHarian()}
          </span>
          {moneyToday < moneyYesterday ? (
            <span className="selisih-down">
              {" "}
              {moneyYesterday === undefined
                ? "Tidak Ada Transaksi"
                : formatter.format(moneyToday - moneyYesterday)}
            </span>
          ) : (
            <span className="selisih-up">
              {moneyYesterday === undefined
                ? "Tidak Ada Transaksi"
                : formatter.format(moneyToday - moneyYesterday)}
            </span>
          )}
        </div>
      )}

      {moneyThisYear && (
        <div style={{ height: "30px" }}>
          <span style={{ margin: "10px 0 0 0" }}>
            {selisihPendapatanTahunIni()}
         
          </span>
          
          {moneyThisYear < moneyLastYear ? (
            <span className="selisih-down">
              {" "}
              {moneyLastYear === undefined
                ? "Tidak Ada Transaksi"
                : formatter.format(moneyThisYear - moneyLastYear)}{" "}
            </span>
          ) : (
            <span className="selisih-up">
              {moneyLastYear === undefined
                ? "Tidak Ada Transaksi"
                : formatter.format(moneyThisYear - moneyLastYear)}
            </span>
          )}
        </div>
      )}
      {transactionToday && (
        <div style={{ height: "30px" }}>
          <span style={{ margin: "10px 0 0 0" }}>
            {selisihTransaksiHariIni()}
          </span>
          {transactionToday < transactionYesterday ? (
            <span className="selisih-down">
              {" "}
              {transactionYesterday === undefined
                ? "Tidak Ada Transaksi"
                : transactionToday - transactionYesterday}{" "}
            </span>
          ) : (
            <span className="selisih-up">
              {transactionYesterday === undefined
                ? "Tidak Ada Transaksi"
                : transactionToday - transactionYesterday}
            </span>
          )}
        </div>
      )}
      {transactionThisMonth && (
        <div style={{ height: "30px" }}>
          <span style={{ margin: "10px 0 0 0" }}>
            {selisihTransaksiBulanIni()}
          </span>
          {transactionThisMonth < transactionLastMonth ? (
            <span className="selisih-down">
              {" "}
              {transactionLastMonth === undefined
                ? "Tidak Ada Transaksi"
                : transactionThisMonth - transactionLastMonth}{" "}
            </span>
          ) : (
            <span className="selisih-up">
              {transactionLastMonth === undefined
                ? "Tidak Ada Transaksi"
                : transactionThisMonth - transactionLastMonth}
            </span>
          )}
        </div>
      )}
      {transactionThisYear && (
        <div style={{ height: "30px" }}>
          <span style={{ margin: "10px 0 0 0" }}>
            {selisihTransaksiTahunIni()}
          </span>
          
          {transactionThisYear < transactionLastYear ? (
            <span className="selisih-down">
              {" "}
              {transactionLastYear === undefined
                ? "Tidak Ada Transaksi"
                : transactionThisYear - transactionLastYear}{" "}
            </span>
          ) : (
            <span className="selisih-up">
              {transactionLastYear === undefined
                ? "Tidak Ada Transaksi"
                : transactionThisYear - transactionLastYear}
            </span>
          )}
        </div>
      )}
    </>
  );
}

export default SelisihNominal;
