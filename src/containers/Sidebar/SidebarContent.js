import React from "react";
import { Menu, Divider } from "antd";
import { Link } from "react-router-dom";
import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";
import UserProfile from "./UserProfile";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE,
} from "../../constants/ThemeSetting";
import IntlMessages from "../../util/IntlMessages";
import { useSelector } from "react-redux";
import {
  BarChartOutlined,
  AppstoreOutlined,
  UserOutlined,
  FormOutlined,
  ApiOutlined,
} from "@ant-design/icons";
import "../../assets/styles/sidebar.css";

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
    if (
      navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR ||
      navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR
    ) {
      return "gx-no-header-notifications";
    }
    return "";
  };

  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split("/")[1];

  return (
    <>
      <SidebarLogo
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
      />
      <div className="gx-sidebar-content">
        <div
          className={`gx-sidebar-notifications ${getNoHeaderClass(navStyle)}`}
        >
          <UserProfile style={{ fontSize: "125%", marginRight: "0px" }} />
          {/* <AppsNavigation /> */}
        </div>
        <CustomScrollbars className="gx-layout-sider-scrollbar">
          <Menu
            // inlineCollapsed={collapsed}
            defaultOpenKeys={[defaultOpenKeys]}
            selectedKeys={[selectedKeys]}
            theme={themeType === THEME_TYPE_LITE ? "lite" : "dark"}
            mode="inline"
            // defaultOpenKeys={['sub1']}
            style={{ fontSize: "150%" }}
          >
            <Menu.Item key="dashboard">
              <Link to="/dashboard">
                <AppstoreOutlined
                  style={{ fontSize: "125%", marginRight: "0px" }}
                />
                {/* <i className="icon icon-widgets" /> */}
                <span style={{ fontSize: "14px" }}>
                  <IntlMessages id="sidebar.dashboard" />
                </span>
              </Link>
            </Menu.Item>
            <SubMenu
              key="device-all"
              style={{ fontSize: "150%", marginTop: "5px" }}
              icon={
                <UserOutlined
                  style={{ fontSize: "125%", marginRight: "0px" }}
                />
              }
              title="Device Agent"
            >
              <Menu.Item
                key="device-all"
                style={{
                  fontSize: "14px",
                  width: "350px",
                  marginLeft: "-20px",
                  marginTop: "0px",
                }}
              >
                <Link to="/device-all">
                  <ApiOutlined
                    style={{ fontSize: "125%", marginRight: "0px" }}
                  />
                  <span>Device All</span>
                </Link>
              </Menu.Item>
              <Menu.Item
                key="device-hotel"
                style={{
                  fontSize: "14px",
                  width: "350px",
                  marginLeft: "-20px",
                  marginTop: "0px",
                }}
              >
                <Link to="/device-hotel">
                  <ApiOutlined
                    style={{ fontSize: "125%", marginRight: "0px" }}
                  />
                  <span>Device Hotel</span>
                </Link>
              </Menu.Item>
              <Menu.Item
                key="device-parkir"
                style={{
                  fontSize: "14px",
                  width: "350px",
                  marginLeft: "-20px",
                  marginTop: "0px",
                }}
              >
                <Link to="/device-parkir">
                  <ApiOutlined
                    style={{ fontSize: "125%", marginRight: "0px" }}
                  />
                  <span>Device Parkir</span>
                </Link>
              </Menu.Item>
              <Menu.Item
                key="device-restoran"
                style={{
                  fontSize: "14px",
                  width: "350px",
                  marginLeft: "-20px",
                  marginTop: "0px",
                }}
              >
                <Link to="/device-restoran">
                  <ApiOutlined
                    style={{ fontSize: "125%", marginRight: "0px" }}
                  />
                  <span>Device Restoran</span>
                </Link>
              </Menu.Item>
              <Divider />
              <Menu.Item
                key="register-device-agent"
                style={{
                  fontSize: "14px",
                  width: "350px",
                  marginLeft: "-20px",
                  marginTop: "0px",
                }}
              >
                <Link to="/register-device-agent">
                  <FormOutlined
                    style={{ fontSize: "125%", marginRight: "0px" }}
                  />
                  <span>Register Device</span>
                </Link>
              </Menu.Item>
            </SubMenu>

            <Menu.Item key="transaction">
              <Link to="/transaction">
                <BarChartOutlined
                  style={{ fontSize: "125%", marginRight: "0px" }}
                />
                <span style={{ fontSize: "14px" }}>Transaction</span>
              </Link>
            </Menu.Item>
            {/* <SubMenu key="status-device" style={{ fontSize: '150%', marginTop: "5px" }}
              icon={<DeploymentUnitOutlined style={{ fontSize: '125%', marginRight: "0px" }} />}
              title="Status Device">
              <Menu.Item key="status-device-all" 
              style={{ fontSize: "14px", width: "350px", marginLeft: "-20px", marginTop: "5px" }}>
                <Link to="/status-device-all">
                  <ApiOutlined style={{ fontSize: '125%', marginRight: "0px" }} />
                  <span><IntlMessages id="sidebar.statusDeviceAll" /></span>
                </Link>
              </Menu.Item>
              <Menu.Item key="status-device-hotel" style={{ fontSize: "14px", width: "350px", marginLeft: "-20px", marginTop: "5px" }}>
                <Link to="/status-device-hotel"  >
                  <ApiOutlined style={{ fontSize: '125%', marginRight: "0px" }} />
                  <span >Device Hotel</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="status-device-restoran" style={{ fontSize: "14px", width: "350px", marginLeft: "-20px", marginTop: "5px" }}>
                <Link to="/status-device-restoran">
                  <ApiOutlined style={{ fontSize: '125%', marginRight: "0px" }} />
                  <span >Device Restoran</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="status-device-parkir" style={{ fontSize: "14px", width: "350px", marginLeft: "-20px", marginTop: "5px" }}>
                <Link to="/status-device-parkir">
                  <ApiOutlined style={{ fontSize: '125%', marginRight: "0px" }} />
                  <span >Device Parkir</span>
                </Link>
              </Menu.Item>
            </SubMenu> */}
          </Menu>
        </CustomScrollbars>
      </div>
    </>
  );
};

export default React.memo(SidebarContent);
