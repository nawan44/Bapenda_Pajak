import React from "react";
import LineIndicator from "./LineIndicator";
import { useLocation} from "react-router-dom";

const SiteAudience = ({ data }) => {
  let location = useLocation();
  const allStatus = data?.map(row => row.status)
  // const greyStatus = allStatus && allStatus.filter(o => o < 0);
  const greenStatus = data?.filter(o => o.status === "green");
const orangeStatus = data?.filter(o => o.status === "orange");
const redStatus = data?.filter(o => o.status === "red");
  // const darkStatus = allStatus && allStatus.filter(o => o >= 3);
  const titleStatus = () => {
    if(location.pathname ==="/device-all" ) {
      return "All"
    } else if(location.pathname ==="/device-restoran" ) {
      return "Restoran"
    }else if(location.pathname ==="/device-parkir" ) {
      return "Parkir"
    }else if(location.pathname ==="/device-hotel" ) {
      return "Hotel"
    }
  }

  return (
    <div className="gx-site-dash gx-mb-2 gx-pt-3 gx-pt-sm-0 gx-pt-xl-2">
      <h3 className="gx-text-uppercase gx-mb-2 gx-mb-sm-4" style={{fontWeight:"bold"}}>% Status Device  {titleStatus()}</h3>
      <ul className="gx-line-indicator">
        <li>
          <LineIndicator width={`${(greenStatus?.length / allStatus?.length * 100).toFixed(2)}%`}  title="Online" color="green"
            value={`${(greenStatus?.length / allStatus?.length * 100).toFixed(2)}%`} />
        </li>
        {/* <li>
          <LineIndicator width="42%" title="&gt; 6 Jam Off" color="blue" value="15%"/>
        </li> */}
        <li>
          <LineIndicator width={`${(orangeStatus?.length / allStatus?.length * 100).toFixed(2)}%`} title="2 Hari Off" color="orange"
            value={`${(orangeStatus?.length / allStatus?.length * 100).toFixed(2)}%`} />
        </li>
        <li>
          <LineIndicator width={`${(redStatus?.length / allStatus?.length * 100).toFixed(2)}%`} title="&gt; 3 Hari Off" color="red"
            value={`${(redStatus?.length / allStatus?.length * 100).toFixed(2)}%`}
          />
        </li>
 
      </ul>
    </div>
  )
};
export default SiteAudience;
