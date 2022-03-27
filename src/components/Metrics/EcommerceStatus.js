import React from "react";
import { Row, Col } from "antd";

import Widget from "components/Widget/index";
import {
  UpCircleFilled,
  DownCircleFilled,
  PauseCircleFilled,
} from "@ant-design/icons";

const EcommerceStatus = ({
  icon,
  title,
  subTitle,
  color,
  colorTitle,
  colorSubTitle,
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
  objTransactionThisYear,
}) => {
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

  const persentasePendapatanBulanIni = () => {
    if (moneyLastMonth === undefined || moneyThisMonth === undefined) {
      return "0";
    } else {
      if (moneyThisMonth > moneyLastMonth) {
        return (
          <div>
            <span className="persen-up">
              {100 *
                Math.abs(
                  (moneyLastMonth - moneyThisMonth) / moneyThisMonth
                ).toFixed(2) +
                "%"}
            </span>
            <UpCircleFilled className="icon-up" />
          </div>
        );
      } else if (moneyThisMonth < moneyLastMonth) {
        return (
          <div>
            <span className="persen-down">
              {100 *
                Math.abs(
                  (moneyLastMonth - moneyThisMonth) / moneyThisMonth
                ).toFixed(2) +
                "%"}
            </span>{" "}
            <DownCircleFilled className="icon-down" />
          </div>
        );
      } else if (moneyThisMonth === moneyLastMonth) {
        return (
          <div>
            <span className="persen-up">
              {100 *
                Math.abs(
                  (moneyLastMonth - moneyThisMonth) / moneyThisMonth
                ).toFixed(2) +
                "%"}
            </span>
            <PauseCircleFilled rotate={90} className="icon-up" />
          </div>
        );
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
    <Widget styleName={`gx-card-full gx-py-4 gx-px-2 gx-bg-${color}`}>
      <div style={{ float: "left", width: "55px" }}>
        {persentasePendapatanBulanIni()}
      </div>
      <div
        className="gx-flex-row gx-justify-content-center gx-mb-3 gx-mb-sm-4"
        style={{ paddingRight: "55px" }}
      >
        <span
          className={`gx-size-80 gx-border gx-border-${colorTitle} gx-text-${colorTitle} gx-flex-row gx-justify-content-center gx-align-items-center gx-rounded-circle`}
        >
          <i className={`icon icon-${icon} gx-fs-xlxl`} />
        </span>
      </div>
      <div className="gx-text-center">
        <h2
          className={`gx-fs-xxxl gx-font-weight-medium gx-text-${colorTitle}`}
        >
          {title}
        </h2>
        <p className={`gx-mb-0 gx-mb-sm-3 gx-text-${colorSubTitle}`}>
          {subTitle}
        </p>
        {objBulanIni && (
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
                {moneyLastMonth === undefined
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

        {objTahunIni && (
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
          <span>
            <p>{selisihTransaksiHariIni()}</p>
            {transactionToday < transactionYesterday ? (
              <p style={{ color: "red" }}>
                {" "}
                {transactionYesterday === undefined
                  ? "Tidak Ada Transaksi"
                  : transactionToday - transactionYesterday}{" "}
              </p>
            ) : (
              <p>
                {transactionYesterday === undefined
                  ? "Tidak Ada Transaksi"
                  : transactionToday - transactionYesterday}
              </p>
            )}
          </span>
        )}
        {objTransactionThisMonth && (
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
        {objTransactionThisYear && (
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
      </div>
    </Widget>
  );
};

export default EcommerceStatus;
