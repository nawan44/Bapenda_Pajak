import React, { useState } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";
import UserProfile from "./UserProfile";
import AppsNavigation from "./AppsNavigation";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE
} from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";
import { useSelector } from "react-redux";
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,OrderedListOutlined,UserOutlined,FormOutlined
} from '@ant-design/icons';

const SidebarContent = ({ sidebarCollapsed, setSidebarCollapsed }) => {
  const { navStyle, themeType } = useSelector(({ settings }) => settings);
  const pathname = useSelector(({ common }) => common.pathname);
  const { SubMenu } = Menu;

  // const [collapsed, setCollapsed] = useState(false)

  // const toggleCollapsed = () => {
  //   setCollapsed({
  //     collapsed: !collapsed,
  //   });
  // };
  const getNoHeaderClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
      return "gx-no-header-notifications";
    }
    return "";
  };

  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split('/')[1];

  return (
    <>
      <SidebarLogo sidebarCollapsed={sidebarCollapsed} setSidebarCollapsed={setSidebarCollapsed} />
      <div className="gx-sidebar-content">
        <div className={`gx-sidebar-notifications ${getNoHeaderClass(navStyle)}`}>
          <UserProfile />
          {/* <AppsNavigation /> */}
        </div>
        <CustomScrollbars className="gx-layout-sider-scrollbar">
          <Menu
            // inlineCollapsed={collapsed}
            defaultOpenKeys={[defaultOpenKeys]}
            selectedKeys={[selectedKeys]}
            theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
            mode="inline"
          // defaultOpenKeys={['sub1']}

          >

            <Menu.Item key="dashboard">
              <Link to="/dashboard"><i className="icon icon-widgets" />
                <span><IntlMessages id="sidebar.dashboard" /></span>
              </Link>
            </Menu.Item>
            <SubMenu key="device-agent" 
            icon={<UserOutlined />}
             title="Device Agent">
               
              <Menu.Item key="register-device-agent"  
              // icon={<FormOutlined  />}
              >
                <Link to="/register-device-agent">
                <i className="icon icon-crypto icon-fw icon-sm" />
                  <span><IntlMessages id="sidebar.registerDeviceAgent" /></span>
                </Link>
              </Menu.Item>               
              <Menu.Item key="list-device-agent" style={{float: 'right'}}
              //  icon={<OrderedListOutlined />}
               > 
                <Link to="/list-device-agent">
                  {/* <OrderedListOutlined /> */}
                  <i  className="icon icon-listing-dbrd icon-fw icon-sm"/>
                  <span><IntlMessages id="sidebar.listDeviceAgent" /></span>
                </Link>
              </Menu.Item>
            </SubMenu>

            {/* <Menu.Item key="transaction">
              <Link to="/transaction"><i className="icon icon-widgets" />
                <span><IntlMessages id="sidebar.transaction" /></span>
              </Link> */}

              <SubMenu key="transaction" 
            icon={<UserOutlined />}
             title="Transaction">
               
              <Menu.Item key="all-transaction">
                <Link to="/all-transaction">
                <i className="icon icon-crypto icon-fw icon-sm" />
                  <span><IntlMessages id="sidebar.transaction" /></span>
                </Link>
              </Menu.Item>           


              <Menu.Item key="list-device-agent" style={{float: 'right'}} > 
                <Link to="/list-device-agent">
                  <i  className="icon icon-listing-dbrd icon-fw icon-sm"/>
                  <span><IntlMessages id="sidebar.listDeviceAgent" /></span>
                </Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </CustomScrollbars>
      </div>
    </>
  );
};

export default React.memo(SidebarContent);

