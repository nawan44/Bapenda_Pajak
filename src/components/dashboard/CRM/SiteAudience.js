import React from "react";
import * as moment from 'moment';
import LineIndicator from "./LineIndicator";

const SiteAudience = ({ result_all_status_device }) => {
  const now = moment().format('YYYY-MM-DD')
  const allStatus = result_all_status_device.map(row => moment(now).diff(moment(row.created_at), 'days'))
  const greyStatus = allStatus && allStatus.filter(o => o < 0);
  const greenStatus = allStatus && allStatus.filter(o => o === 0);
  const orangeStatus = allStatus && allStatus.filter(o => o === 1);
  const redStatus = allStatus && allStatus.filter(o => o === 2);
  const darkStatus = allStatus && allStatus.filter(o => o >= 3);


  return (
    <div className="gx-site-dash gx-mb-2 gx-pt-3 gx-pt-sm-0 gx-pt-xl-2">
      <h4 className="gx-text-uppercase gx-mb-2 gx-mb-sm-4">% Status Device</h4>
      <ul className="gx-line-indicator">
        <li>
          <LineIndicator width={`${(greenStatus.length / allStatus.length * 100).toFixed(2)}%`}  title="Online" color="green"
            value={`${(greenStatus.length / allStatus.length * 100).toFixed(2)}%`} />
        </li>
        {/* <li>
          <LineIndicator width="42%" title="&gt; 6 Jam Off" color="blue" value="15%"/>
        </li> */}
        <li>
          <LineIndicator width={`${(orangeStatus.length / allStatus.length * 100).toFixed(2)}%`} title="2 Hari Off" color="orange"
            value={`${(orangeStatus.length / allStatus.length * 100).toFixed(2)}%`} />
        </li>
        <li>
          <LineIndicator width={`${(redStatus.length / allStatus.length * 100).toFixed(2)}%`} title="Dalam Pemantauan" color="red"
            value={`${(redStatus.length / allStatus.length * 100).toFixed(2)}%`}
          />
        </li>
        <li>
          <LineIndicator width={`${(darkStatus.length / allStatus.length * 100).toFixed(2)}%`} title="Pelaporan Bapenda" color="dark"
            value={`${(darkStatus.length / allStatus.length * 100).toFixed(2)}%`}
          />
        </li>
        <li>
          <LineIndicator width={`${(greyStatus.length / allStatus.length * 100).toFixed(2)}%`} title="Off" color="grey"
            value={`${(greyStatus.length / allStatus.length * 100).toFixed(2)}%`}
          />
        </li>
      </ul>
    </div>
  )
};
export default SiteAudience;
