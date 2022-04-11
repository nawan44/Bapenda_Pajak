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
}) => {
  
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
      <div
        className="gx-flex-row gx-justify-content-center gx-mb-3 gx-mb-sm-4"
        style={{ paddingRight: color === "grey" ? "0px" : "70px" }}
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
    </Widget>
  );
};

export default EcommerceStatus;
