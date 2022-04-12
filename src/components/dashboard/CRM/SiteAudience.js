import React from "react";
import LineIndicator from "./LineIndicator";
import { useLocation } from "react-router-dom";

const SiteAudience = ({ data }) => {
  let location = useLocation();

  const allStatus = data?.map((row) => row.status);
  const greenStatus = data?.filter((o) => o.status === "green");
  const orangeStatus = data?.filter((o) => o.status === "orange");
  const redStatus = data?.filter((o) => o.status === "red");
  
  const titleStatus = () => {
    if (location.pathname === "/device-all") {
      return "All";
    } else if (location.pathname === "/device-restoran") {
      return "Restoran";
    } else if (location.pathname === "/device-parkir") {
      return "Parkir";
    } else if (location.pathname === "/device-hotel") {
      return "Hotel";
    }
  };

  return (
    <div className="gx-site-dash gx-mb-2 gx-pt-3 gx-pt-sm-0 gx-pt-xl-2">
      <h3
        className="gx-text-uppercase gx-mb-2 gx-mb-sm-4"
        style={{ fontWeight: "bold" }}
      >
        % Status Device {titleStatus()}
      </h3>
      <ul className="gx-line-indicator">
        <li>
          <LineIndicator
            width={
              greenStatus?.length > 0 ?
              `${((greenStatus?.length / allStatus?.length) * 100).toFixed(
              2
            )}%`: `0%`}
            title="Online"
            color="green"
            value={
              greenStatus?.length > 0 ?

              `${((greenStatus?.length / allStatus?.length) * 100).toFixed(
              2
            )}%`: `0%`}
          />
        </li>
        <li>
          <LineIndicator
            width={
              
              orangeStatus?.length > 0 ?
              `${(
              (orangeStatus?.length / allStatus?.length) *
              100
            ).toFixed(2)}%`: `0%`
          
          }
            title="2 Hari Off"
            color="orange"
            value={
              orangeStatus?.length > 0 ?

              `${(
              (orangeStatus?.length / allStatus?.length) *
              100
            ).toFixed(2)}%`: `0%`
          
          }
          />
        </li>
        <li>
          <LineIndicator
            width={
              redStatus?.length > 0 ?

              `${((redStatus?.length / allStatus?.length) * 100).toFixed(
              2
            )}%`: `0%`
          }
            title="&gt; 3 Hari Off"
            color="red"
            value={
              redStatus?.length > 0 ?

              `${((redStatus?.length / allStatus?.length) * 100).toFixed(
              2
            )}%`: `0%`
          }
          />
        </li>
      </ul>
    </div>
  );
};
export default SiteAudience;
