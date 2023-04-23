import React from "react";
import { Avatar, Dropdown, MenuProps } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useLoginStore } from "src/stores";
import { removeLocalStorageItem } from "src/utils/localStorage";

const RightContent: React.FC = () => {
  const { setUserInfo } = useLoginStore();
  const logoutHandle = () => {
    removeLocalStorageItem("userInfo");
    setUserInfo(null);
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <span onClick={logoutHandle}>退出登录</span>,
    },
    {
      key: "2",
      label: "个人中心",
    },
  ];

  return (
    <Dropdown menu={{ items }} placement="bottomRight">
      <Avatar icon={<UserOutlined />} style={{ cursor: "pointer" }} />
    </Dropdown>
  );
};

export default RightContent;
