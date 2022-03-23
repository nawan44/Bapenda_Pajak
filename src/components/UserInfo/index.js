import React from "react";
import {Avatar, Popover} from "antd";
import {useAuth} from "../../authentication";
import {useHistory} from "react-router-dom";

const UserInfo = () => {
  const {userSignOut} = useAuth();
  const history = useHistory();

  const onLogoutClick = () => {
    userSignOut(() => {
      history.push('/');
    });
  }

  const onMyAccount = () => {
      history.push('/my-account');
  
  }

  const userMenuOptions = (
    <ul className="gx-user-popover">
      <li  onClick={onMyAccount}>My Account</li>
      {/* <li>Connections</li> */}
      <li onClick={onLogoutClick}>Logout
      </li>
    </ul>
  );

  return (
    <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight" content={userMenuOptions} trigger="click">
      <Avatar  src="/assets/images/avatar.png" className="gx-avatar gx-pointer" alt=""/>
    </Popover>
  );
};

export default UserInfo;
