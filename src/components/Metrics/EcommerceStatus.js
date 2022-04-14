import React from "react";
import Widget from "components/Widget/index";
import SelisihNominal from "../../routes/Dashboard/Math/selisihNominal";
import SelisihPresentase from "../../routes/Dashboard/Math/selisihPersentase";

const EcommerceStatus = ({
  icon,
  title,
  subTitle,
  color,
  colorTitle,
  colorSubTitle,
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
  transactionThisMonth,
  transactionLastMonth,
  objTransactionThisMonth,
  transactionThisYear,
  transactionLastYear,
  objTransactionThisYear,
  taxThisMonth,
  nettThisMonth,
}) => {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  const day = () => {
    if (moneyToday) {
      return "Hari Ini";
    } else if (moneyThisMonth) {
      return "Bulan Ini";
    } else if (moneyThisYear) {
      return "Tahun Ini";
    } else if (moneyYesterday) {
      return "Kemarin";
    } else  if (transactionToday) {
      return "Hari Ini";
    } else if (transactionThisMonth) {
      return "Bulan Ini";
    } else if (transactionThisYear) {
      return "Tahun Ini";
    } 
  };
  return (
    <Widget styleName={`gx-card-full gx-py-4 gx-px-2 gx-bg-${color}`}>
      {color === "grey" ? (
        <div></div>
      ) : (
        <div style={{ float: "left", width: "70px" }}>
          <SelisihPresentase
            moneyToday={moneyToday}
            moneyYesterday={moneyYesterday}
            moneyThisMonth={moneyThisMonth}
            moneyLastMonth={moneyLastMonth}
            objBulanIni={objBulanIni}
            moneyThisYear={moneyThisYear}
            moneyLastYear={moneyLastYear}
            objTahunIni={objTahunIni}
            transactionToday={transactionToday}
            transactionYesterday={transactionYesterday}
            transactionThisMonth={transactionThisMonth}
            transactionLastMonth={transactionLastMonth}
            objTransactionThisMonth={objTransactionThisMonth}
            transactionThisYear={transactionThisYear}
            transactionLastYear={transactionLastYear}
            objTransactionThisYear={objTransactionThisYear}
          />
        </div>
      )}
      {/* <div
        className="gx-flex-row gx-justify-content-center gx-mb-3 gx-mb-sm-4"
        style={{ paddingRight: color === "grey" ? "0px" : "70px" }}
      >
        <span
          className={`gx-size-80 gx-border gx-border-${colorTitle} gx-text-${colorTitle} gx-flex-row gx-justify-content-center gx-align-items-center gx-rounded-circle`}
        >
          <i className={`icon icon-${icon} gx-fs-xlxl`} />
        </span>
      </div> */}
      <div
        className="gx-justify-content-center gx-flex-row "
        style={{ paddingRight: color === "grey" ? "0px" : "70px" }}
      >
        <h2
          className={`gx-fs-xxxl gx-font-weight-medium gx-text-${colorTitle}`}
        >
          {title}
        </h2>
      </div>
      {/* <div
        className="gx-justify-content-center  gx-flex-row "
        style={{
          paddingRight: color === "grey" ? "0px" : "0px",
          background: "yellow",
        }}
      >sdjdhvbdijdsbvdsvbui</div> */}
      {/* {color === "grey" ? (
        <div></div>
      ) : (
       <div>
         {moneyToday || moneyThisMonth || moneyThisYear ? (
            <div className="quarter-circle-bottom-right1">
            <h5 style={{ paddingTop: "25px" }}>{day()}</h5>
          </div>) : (
            
            <div className="quarter-circle-bottom-right2">
            <h5 style={{ paddingTop: "25px" }}>{day()}</h5>
          </div>
          )
         }
       </div>
      )} */}

      <div
        style={{
          height: "100%",
          textAlign: "center",
          margin: "0 auto",
          // paddingLeft: color === "grey" ? "0px" : "70px",
        }}
      >
        <div>
          <h3 className={`gx-mb-0 gx-mb-sm-3 gx-text-${colorSubTitle}`}>
            {subTitle}
          </h3>
          <SelisihNominal
            moneyToday={moneyToday}
            moneyYesterday={moneyYesterday}
            moneyThisMonth={moneyThisMonth}
            moneyLastMonth={moneyLastMonth}
            objBulanIni={objBulanIni}
            moneyThisYear={moneyThisYear}
            moneyLastYear={moneyLastYear}
            objTahunIni={objTahunIni}
            transactionToday={transactionToday}
            transactionYesterday={transactionYesterday}
            transactionThisMonth={transactionThisMonth}
            transactionLastMonth={transactionLastMonth}
            objTransactionThisMonth={objTransactionThisMonth}
            transactionThisYear={transactionThisYear}
            transactionLastYear={transactionLastYear}
            objTransactionThisYear={objTransactionThisYear}
          />
        </div>
      </div>
    </Widget>
  );
};

export default EcommerceStatus;
