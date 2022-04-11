import React  from "react";
import Widget from "components/Widget/index";
// import reqOptions from "../../../util/reqOptions";
import EventsSection from "./EventSection";

const LatestTransaction = (props) => {
  const { latestTransaction, setLatestTransaction } = props;
  return (
    <Widget styleName="gx-order-history">
      <EventsSection
        latestTransaction={latestTransaction}
        setLatestTransaction={setLatestTransaction}
      />
    </Widget>
  );
};

export default LatestTransaction;