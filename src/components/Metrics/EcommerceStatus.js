import React from "react";

import Widget from "components/Widget/index";
import { UpCircleFilled, DownCircleFilled, PauseCircleFilled } from '@ant-design/icons';

const EcommerceStatus = ({ icon, title, subTitle, color, colorTitle, colorSubTitle, objToday
  , moneyToday, setMoneyToday,moneyYesterday, setMoneyYesterday,
  moneyThisMonth, setMoneyThisMonth,moneyLastMonth, setMoneyLastMonth, objBulanIni,
  moneyThisYear, setMoneyThisYear, moneyLastYear,  setMoneyLastYear, objTahunIni,
  transactionToday, setTransactionToday, transactionYesterday,  setTransactionYesterday, objTransactionToday,
  transactionThisMonth, setTransactionThisMonth, transactionLastMonth,  setTransactionLastMonth, objTransactionThisMonth,
  transactionThisYear, setTransactionThisYear, transactionLastYear,  setTransactionLastYear, objTransactionThisYear,
}) => {



  const selisihTransaksiHariIni = () => {
    if (transactionToday > transactionYesterday) {
      return <UpCircleFilled style={{ fontSize: '24px', color: 'blue', margin: "10px 0 0 0" }} />
    } else if (transactionToday < transactionYesterday) {
      return <DownCircleFilled style={{ fontSize: '24px', color: 'red', margin: "10px 0 0 0" }} />
    } else if (transactionToday === transactionYesterday) {
      return <PauseCircleFilled rotate={90} style={{ fontSize: '24px', color: 'black', margin: "10px 0 0 0" }}
      />
    } else {
      return "Tidak Ada Transaksi"
    }
  }
  const selisihTransaksiBulanIni = () => {
    if (transactionThisMonth > transactionLastMonth) {
      return <UpCircleFilled style={{ fontSize: '24px', color: 'blue', margin: "10px 0 0 0" }} />

    } else if (transactionThisMonth < transactionLastMonth) {
      return <DownCircleFilled style={{ fontSize: '24px', color: 'red', margin: "10px 0 0 0" }} />

    } else if (transactionThisMonth === transactionLastMonth) {
      return <PauseCircleFilled rotate={90} style={{ fontSize: '24px', color: 'black', margin: "10px 0 0 0" }}
      />
    } else {
      return "Tidak Ada Transaksi"
    }
  }
  const selisihTransaksiTahunIni = () => {
    if (transactionThisYear > transactionLastYear) {
      return <UpCircleFilled style={{ fontSize: '24px', color: 'blue', margin: "10px 0 0 0" }} />
    } else if (transactionThisYear < transactionLastYear) {
      return <DownCircleFilled style={{ fontSize: '24px', color: 'red', margin: "10px 0 0 0" }} />
    } else if (transactionThisYear === transactionLastYear) {
      return <PauseCircleFilled rotate={90} style={{ fontSize: '24px', color: 'black', margin: "10px 0 0 0" }}
      />
    } else {
      return "Tidak Ada Transaksi"
    }
  }

  const selisihTransaksiHarian = () => {
    if (moneyToday > moneyYesterday) {
      return <UpCircleFilled style={{ fontSize: '24px', color: 'blue', margin: "10px 0 0 0" }} />
    } else if (moneyToday < moneyYesterday) {
      return <DownCircleFilled style={{ fontSize: '24px', color: 'red', margin: "10px 0 0 0" }} />
    } else if (moneyToday === moneyYesterday) {
      return <PauseCircleFilled rotate={90} style={{ fontSize: '24px', color: 'black', margin: "10px 0 0 0" }}/>
    } else {
      return "Tidak Ada Transaksi"
    }
  }

  const selisihPendapatanBulanIni = () => {
    if (moneyThisMonth > moneyLastMonth) {
      return <UpCircleFilled style={{ fontSize: '24px', color: 'blue', margin: "10px 0 0 0" }} />
    } else if (moneyThisMonth < moneyLastMonth) {
      return <DownCircleFilled style={{ fontSize: '24px', color: 'red', margin: "10px 0 0 0" }} />
    } else if (moneyThisMonth === moneyLastMonth) {
      return <PauseCircleFilled rotate={90} style={{ fontSize: '24px', color: 'black', margin: "10px 0 0 0" }}
      />
    } else {
      return "Tidak Ada Transaksi"
    }
  }
  const selisihPendapatanTahunIni = () => {
    if (moneyThisYear > moneyLastYear) {
      return <UpCircleFilled style={{ fontSize: '24px', color: 'blue', margin: "10px 0 0 0" }} />
    } else if (moneyThisYear < moneyLastYear) {
      return <DownCircleFilled style={{ fontSize: '24px', color: 'red', margin: "10px 0 0 0" }} />
    } else if (moneyThisYear === moneyLastYear) {
      return <PauseCircleFilled rotate={90} style={{ fontSize: '24px', color: 'black', margin: "10px 0 0 0" }}
      />
    } else {
      return "Tidak Ada Transaksi"
    }
  }
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  });
  return (
    <Widget styleName={`gx-card-full gx-py-4 gx-px-2 gx-bg-${color}`}  >
      <div className="gx-flex-row gx-justify-content-center gx-mb-3 gx-mb-sm-4" >
        <span
          className={`gx-size-80 gx-border gx-border-${colorTitle} gx-text-${colorTitle} gx-flex-row gx-justify-content-center gx-align-items-center gx-rounded-circle`}>
          <i className={`icon icon-${icon} gx-fs-xlxl`} /></span>
      </div>
      <div className="gx-text-center">
        <h2 className={`gx-fs-xxxl gx-font-weight-medium gx-text-${colorTitle}`}>{title}</h2>
        <p className={`gx-mb-0 gx-mb-sm-3 gx-text-${colorSubTitle}`}>{subTitle}</p>
        {
          moneyToday  && (
            <span>
              <p>{selisihTransaksiHarian()}</p>
              {moneyToday < moneyYesterday ? 
           <p style={{color:"red"}} > {moneyYesterday === undefined ? "Tidak Ada Transaksi" : formatter.format(moneyToday - moneyYesterday)}</p> 
           : <p>{moneyYesterday === undefined ? "Tidak Ada Transaksi" : formatter.format(moneyToday - moneyYesterday)}</p>
              }
            </span>
          )
        }
      {
          objBulanIni  && (
            <span>
              <p>{selisihPendapatanBulanIni()}</p>
              { moneyThisMonth < moneyLastMonth ? 
                <p style={{color:"red"}} >  {moneyLastMonth === undefined ? "Tidak Ada Transaksi" : formatter.format(moneyThisMonth - moneyLastMonth)}  </p> 
                : <p >{moneyLastMonth === undefined ? "Tidak Ada Transaksi" : formatter.format(moneyThisMonth - moneyLastMonth)}</p>
              }
            </span>
          )
        }
          {
          objTahunIni  && ( 
            <span>
              <p>{selisihPendapatanTahunIni()}</p>
              { moneyThisYear < moneyLastYear ? 
                <p style={{color:"red"}} >  {moneyLastYear === undefined ? "Tidak Ada Transaksi" : formatter.format(moneyThisYear - moneyLastYear)}  </p> 
                : <p >{moneyLastYear === undefined ? "Tidak Ada Transaksi" : formatter.format(moneyThisYear - moneyLastYear)}</p>
              }
            </span>
          )
        }
         {
          transactionToday  && ( 
            <span>
              <p>{selisihTransaksiHariIni()}</p>
              { transactionToday < transactionYesterday ? 
                <p style={{color:"red"}} >  {transactionYesterday === undefined ? "Tidak Ada Transaksi" : transactionToday - transactionYesterday}  </p> 
                : <p >{transactionYesterday === undefined ? "Tidak Ada Transaksi" : transactionToday - transactionYesterday}</p>
              }
            </span>
          )
        }
          {
          objTransactionThisMonth  && ( 
            <span>
              <p>{selisihTransaksiBulanIni()}</p>
              { transactionThisMonth < transactionLastMonth ? 
                <p style={{color:"red"}} >  {transactionLastMonth === undefined ? "Tidak Ada Transaksi" : transactionThisMonth - transactionLastMonth}  </p> 
                : <p >{transactionLastMonth === undefined ? "Tidak Ada Transaksi" : transactionThisMonth - transactionLastMonth}</p>
              }
            </span>
          )
        }
          {
          objTransactionThisYear  && ( 
            <span>
              <p>{selisihTransaksiTahunIni()}</p>
              { transactionThisYear < transactionLastYear ? 
                <p style={{color:"red"}} >  {transactionLastYear === undefined ? "Tidak Ada Transaksi" : transactionThisYear - transactionLastYear}  </p> 
                : <p >{transactionLastYear === undefined ? "Tidak Ada Transaksi" : transactionThisYear - transactionLastYear}</p>
              }
            </span>
          )
        }
      </div>
    </Widget>
  );
};

export default EcommerceStatus;
