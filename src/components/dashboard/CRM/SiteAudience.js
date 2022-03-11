import React from "react";

import LineIndicator from "./LineIndicator";

const SiteAudience = () => {

  return (
    <div className="gx-site-dash gx-mb-2 gx-pt-3 gx-pt-sm-0 gx-pt-xl-2">
      <h4 className="gx-text-uppercase gx-mb-2 gx-mb-sm-4">% Status Device</h4>
      <ul className="gx-line-indicator">
        <li>
          <LineIndicator width="56%" title="Online" color="green" value="50%"/>
        </li>
        <li>
          <LineIndicator width="42%" title="&gt; 6 Jam Off" color="blue" value="15%"/>
        </li>
        <li>
          <LineIndicator width="20%" title="&gt; 48 Jam Off" color="orange" value="20%"/>
        </li>
        <li>
          <LineIndicator width="42%" title="	&gt; Dalam Pemantauan" color="red" value="10%"/>
        </li>
        <li>
          <LineIndicator width="20%" title="Suspend Bapenda" color="dark" value="5%"/>
        </li>
      </ul>
    </div>
  )
};
export default SiteAudience;
