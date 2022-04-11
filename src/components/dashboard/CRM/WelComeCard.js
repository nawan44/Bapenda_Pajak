import React from "react";
import { Avatar } from 'antd';
import { useLocation} from "react-router-dom";



const WelComeCard = ({data}) => {

let location = useLocation();
// const allStatus =result_all_status_device.map(row => moment(now).diff(moment(row.created_at), 'days'))
// const greyStatus = allStatus && allStatus.filter(o => o <  0);
const allStatus = data?.map(row => row.status)
const greenStatus = data?.filter(o => o.status === "green");
const orangeStatus = data?.filter(o => o.status === "orange");
const redStatus = data?.filter(o => o.status === "red");
// const darkStatus = allStatus && allStatus.filter(o => o >= 3);
// const greenStatus = allStatus && allStatus.filter(o => o === 0);

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
    <div className="gx-wel-ema gx-pt-xl-2">
      <h1 className="gx-mb-3">Rekap Status Device {titleStatus()}</h1>
      {/* <p className="gx-fs-sm gx-text-uppercase">You Have</p> */}
      <ul className="gx-list-group">
      <li>
          <span style={{fontWeight:"bold"}}>Total {allStatus?.length}  Devices </span>
        </li>
        <li>
          <Avatar size="small" shape="square" style={{backgroundColor:"green", marginRight:"10px"}} />
          <span>{greenStatus?.length} Devices Online</span>
        </li>
        <li>
        <Avatar size="small" shape="square" style={{backgroundColor:"orange", marginRight:"10px"}} />
          <span>{orangeStatus?.length}  Devices 	2 Hari Off</span>
        </li>
        <li>
        <Avatar size="small" shape="square" style={{backgroundColor:"red", marginRight:"10px"}} />
          <span>{redStatus?.length} Devices &gt; 3 Hari Off</span>
        </li>
      </ul>
    </div>

  );
};

export default WelComeCard;
