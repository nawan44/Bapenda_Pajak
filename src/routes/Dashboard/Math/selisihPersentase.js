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
              {(
                100 * Math.abs((moneyYesterday - moneyToday) / moneyYesterday)
              ).toFixed(0) + "%"}
            </span>
            <CaretUpOutlined className="icon-up" />
          </div>
        );
      } else if (moneyToday < moneyYesterday) {
        return (
          <div>
            <span className="persen-down">
              {(
                100 * Math.abs((moneyYesterday - moneyToday) / moneyYesterday)
              ).toFixed(0) + "%"}
            </span>{" "}
            <CaretDownOutlined className="icon-down" />
          </div>
        );
      } else if (moneyToday === moneyYesterday) {
        return (
          <div>
            <span className="persen-up">
              {(
                100 * Math.abs((moneyYesterday - moneyToday) / moneyYesterday)
              ).toFixed(0) + "%"}
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
              {(
                100 *
                Math.abs((moneyLastMonth - moneyThisMonth) / moneyLastMonth)
              ).toFixed(0) + "%"}
            </span>
            <CaretUpOutlined className="icon-up" />
          </div>
        );
      } else if (moneyThisMonth < moneyLastMonth) {
        return (
          <div>
            <span className="persen-down">
              {(
                100 *
                Math.abs((moneyLastMonth - moneyThisMonth) / moneyLastMonth)
              ).toFixed(0) + "%"}
            </span>{" "}
            <CaretDownOutlined className="icon-down" />
          </div>
        );
      } else if (moneyThisMonth === moneyLastMonth) {
        return (
          <div>
            <span className="persen-up">
              {100 *
                Math.abs(
                  (moneyLastMonth - moneyThisMonth) / moneyLastMonth
                ).toFixed(0) +
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
              {(
                100 * Math.abs((moneyLastYear - moneyThisYear) / moneyLastYear)
              ).toFixed(0) + "%"}
            </span>
            <CaretUpOutlined className="icon-up" />
          </div>
        );
      } else if (moneyThisYear < moneyLastYear) {
        return (
          <div>
            <span className="persen-down">
              {(
                100 * Math.abs((moneyLastYear - moneyThisYear) / moneyLastYear)
              ).toFixed(0) + "%"}
            </span>{" "}
            <CaretDownOutlined className="icon-down" />
          </div>
        );
      } else if (moneyThisYear === moneyLastYear) {
        return (
          <div>
            <span className="persen-up">
              {(
                100 * Math.abs((moneyLastYear - moneyThisYear) / moneyLastYear)
              ).toFixed(0) + "%"}
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
              {(
                100 *
                Math.abs(
                  (transactionYesterday - transactionToday) /
                    transactionYesterday
                )
              ).toFixed(0) + "%"}
            </span>
            <CaretUpOutlined className="icon-up" />
          </div>
        );
      } else if (transactionToday < transactionYesterday) {
        return (
          <div>
            <span className="persen-down">
              {(
                100 *
                Math.abs(
                  (transactionYesterday - transactionToday) /
                    transactionYesterday
                )
              ).toFixed(0) + "%"}
            </span>{" "}
            <CaretDownOutlined className="icon-down" />
          </div>
        );
      } else if (transactionToday === transactionYesterday) {
        return (
          <div>
            <span className="persen-up">
              {(
                100 *
                Math.abs(
                  (transactionYesterday - transactionToday) /
                    transactionYesterday
                )
              ).toFixed(0) + "%"}
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
              {(
                100 *
                Math.abs(
                  (transactionLastMonth - transactionThisMonth) /
                    transactionLastMonth
                )
              ).toFixed(0) + "%"}
            </span>
            <CaretUpOutlined className="icon-up" />
          </div>
        );
      } else if (transactionThisMonth < transactionLastMonth) {
        return (
          <div>
            <span className="persen-down">
              {(
                100 *
                Math.abs(
                  (transactionLastMonth - transactionThisMonth) /
                    transactionLastMonth
                )
              ).toFixed(0) + "%"}
            </span>{" "}
            <CaretDownOutlined className="icon-down" />
          </div>
        );
      } else if (transactionThisMonth === transactionLastMonth) {
        return (
          <div>
            <span className="persen-up">
              {(
                100 *
                Math.abs(
                  (transactionLastMonth - transactionThisMonth) /
                    transactionLastMonth
                )
              ).toFixed(0) + "%"}
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
              {(
                100 *
                Math.abs(
                  (transactionLastYear - transactionThisYear) /
                    transactionLastYear
                )
              ).toFixed(0) + "%"}
            </span>
            <CaretUpOutlined className="icon-up" />
          </div>
        );
      } else if (transactionThisYear < transactionLastYear) {
        return (
          <div>
            <span className="persen-down">
              {(
                100 *
                Math.abs(
                  (transactionLastYear - transactionThisYear) /
                    transactionLastYear
                )
              ).toFixed(0) + "%"}
            </span>{" "}
            <CaretDownOutlined className="icon-down" />
          </div>
        );
      } else if (transactionThisYear === transactionLastYear) {
        return (
          <div>
            <span className="persen-up">
              {(
                100 *
                Math.abs(
                  (transactionLastYear - transactionThisYear) /
                    transactionLastYear
                )
              ).toFixed(0) + "%"}
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
      {moneyYesterday === 0 ? (
        <div>
          <span className="persen-up">100%</span>
          <CaretUpOutlined className="icon-up" />
        </div>
      ) : (
        moneyToday && <span>{persentasePendapatanHariIni()}</span>
      )}
      {moneyLastMonth === 0 ? (
        <div>
          <span className="persen-up">100%</span>
          <CaretUpOutlined className="icon-up" />
        </div>
      ) : (
        moneyThisMonth && <span>{persentasePendapatanBulanIni()}</span>
      )}
      {moneyLastYear === 0 ? (
        <div>
          <span className="persen-up">100%</span>
          <CaretUpOutlined className="icon-up" />
        </div>
      ) : (
        moneyThisYear && <span>{persentasePendapatanTahunIni()}</span>
      )}

      {transactionYesterday === 0 ? (
        <div>
          <span className="persen-up">100%</span>
          <CaretUpOutlined className="icon-up" />
        </div>
      ) : (
        transactionToday && <span>{persentaseTransaksiHariIni()}</span>
      )}
      {transactionLastMonth === 0 ? (
        <div>
          <span className="persen-up">100%</span>
          <CaretUpOutlined className="icon-up" />
        </div>
      ) : (
        transactionThisMonth && <span>{persentaseTransaksiBulanIni()}</span>
      )}
      {transactionLastYear === 0 ? (
        <div>
          <span className="persen-up">100%</span>
          <CaretUpOutlined className="icon-up" />
        </div>
      ) : (
        transactionThisYear && <span>{persentaseTransaksiTahunIni()}</span>
      )}
    </>
  );
}

export default SelisihPresentase;
