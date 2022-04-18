import React, { useState, useEffect } from "react";
import { Avatar, Divider, Timeline } from "antd";
import WidgetHeader from "../../../components/WidgetHeader/index";
// import ActivityItem from "./ActivityItem";
import ActivityItem from "../../../components/dashboard/CRM/ActivityItem";
import TopTenPajak from "./topTenPajak";
import TopTenRevenue from "./topTenRevenue";
import TopTenTransaction from "./topTenTransaction";



function TopTen() {
//   const [limit, setLimit] = useState(3);
//   const [shape, setShape] = useState(props.shape);

//   useEffect(() => {
//     setShape(props.shape);
//     if (window.innerWidth < 575) {
//       setLimit(1);
//     }
//   }, [props.shape]);

//   const onLoadMore = () => {
//     setLimit(limit + 1);
//   };

  return (
    <div className="gx-entry-sec">
      <WidgetHeader 
    //   title="Top Ten" 
      />

        <div className="gx-timeline-info" >
          {/* <h4 className="gx-timeline-info-day">AAA</h4> */}
          <TopTenPajak/>
          <Divider/>
         <TopTenRevenue/>
          <Divider/>
          <TopTenTransaction/>
        </div>

    </div>
  );
}

export default TopTen;
