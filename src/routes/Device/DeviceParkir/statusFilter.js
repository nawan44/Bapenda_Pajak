import React from "react";
import "antd/lib/menu/style/css";
import "antd/lib/dropdown/style/css";
import "antd/lib/icon/style/css";
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

export const StatusFilter = ({ filterBy, ...props }) => {
  const onClick = ({ key }) => {
    filterBy(key);
  };

  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="1">Green</Menu.Item>
      <Menu.Item key="2">Orange</Menu.Item>
      <Menu.Item key="3">Red</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="4">Clear Filter</Menu.Item>
    </Menu>
  );

  return (
    <div {...props}>
      <Dropdown  overlay={menu}>
        <a className="ant-dropdown-link" href="#">
          Filter By Status<DownOutlined />
        </a>
      </Dropdown>
    </div>
  );
};
