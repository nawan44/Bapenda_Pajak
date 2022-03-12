import React from "react";
import Icon from '@ant-design/icons';
import { Badge, Button, Switch, Divider, Avatar } from 'antd';
import * as moment from 'moment';
import 'moment/locale/id'
import { MailOutlined,MessageOutlined,BellOutlined,UnorderedListOutlined   } from '@ant-design/icons';



const WelComeCard = ({result_all_transaction}) => {
  const now = moment().format('YYYY-MM-DD')
const allStatus =result_all_transaction.map(row => moment(now).diff(moment(row.created_at), 'days'))
const greyStatus = allStatus && allStatus.filter(o => o <  0);
const greenStatus = allStatus && allStatus.filter(o => o === 0);
const orangeStatus = allStatus && allStatus.filter(o => o === 1);
const redStatus = allStatus && allStatus.filter(o => o  === 2);
const darkStatus = allStatus && allStatus.filter(o => o >= 10);
// const greenStatus = allStatus && allStatus.filter(o => o === 0);


  return (
    <div className="gx-wel-ema gx-pt-xl-2">
      <h1 className="gx-mb-3">Rekap Status Device</h1>
      {/* <p className="gx-fs-sm gx-text-uppercase">You Have</p> */}
      <ul className="gx-list-group">
        <li>
          <Avatar size="small" shape="square" style={{backgroundColor:"green", marginRight:"10px"}} />
          <span>{greenStatus.length} Devices Online</span>
        </li>
        {/* <li>
        <Avatar size="small" shape="square" style={{backgroundColor:"blue", marginRight:"10px"}} />
          <span>{orangeStatus.length} 15 Devices &gt; 6 Jam Off</span>
        </li> */}
        <li>
        <Avatar size="small" shape="square" style={{backgroundColor:"orange", marginRight:"10px"}} />
          <span>{orangeStatus.length}  Devices 	2 Hari Off</span>
        </li>
        <li>
        <Avatar size="small" shape="square" style={{backgroundColor:"red", marginRight:"10px"}} />
          <span>{redStatus.length} Devices 	Dalam Pemantauan</span>
        </li>
        <li>
        <Avatar size="small" shape="square" style={{backgroundColor:"black", marginRight:"10px"}} />
          <span>{darkStatus.length} Devices 	 Pelaporan Bapenda</span>
        </li>
        <li>
        <Avatar size="small" shape="square" style={{backgroundColor:"grey", marginRight:"10px"}} />
          <span>{greyStatus.length} Devices 	 Libur / Off</span>
        </li>
      </ul>
    </div>

  );
};

export default WelComeCard;
