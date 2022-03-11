import React from "react";
import Icon from '@ant-design/icons';
import { Badge, Button, Switch, Divider, Avatar } from 'antd';

import { MailOutlined,MessageOutlined,BellOutlined,UnorderedListOutlined   } from '@ant-design/icons';
const WelComeCard = () => {

  return (
    <div className="gx-wel-ema gx-pt-xl-2">
      <h1 className="gx-mb-3">Rekap Status Device</h1>
      {/* <p className="gx-fs-sm gx-text-uppercase">You Have</p> */}
      <ul className="gx-list-group">
        <li>
          <Avatar size="small" shape="square" style={{backgroundColor:"green", marginRight:"10px"}} />
      
          <span>50 Devices Online</span>
        </li>
        <li>
        <Avatar size="small" shape="square" style={{backgroundColor:"blue", marginRight:"10px"}} />
          <span>15 Devices &gt; 6 Jam Off</span>
        </li>
        <li>
        <Avatar size="small" shape="square" style={{backgroundColor:"orange", marginRight:"10px"}} />
          <span>20 Devices 	&gt; 48 Jam Off</span>
        </li>
        <li>
        <Avatar size="small" shape="square" style={{backgroundColor:"red", marginRight:"10px"}} />
          <span>10 Devices 	&gt; Dalam Pemantauan</span>
        </li>
        <li>
        <Avatar size="small" shape="square" style={{backgroundColor:"black", marginRight:"10px"}} />
          <span>5 Devices 	 Suspend Bapenda</span>
        </li>
      </ul>
    </div>

  );
};

export default WelComeCard;
