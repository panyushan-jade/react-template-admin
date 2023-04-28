import React, { ChangeEvent } from "react";
import { Avatar, Dropdown, MenuProps, Button, Input } from "antd";
import { UserOutlined, SkinOutlined } from "@ant-design/icons";
import { useLoginStore, useGlobalStore } from "@stores/index";
import { debounce } from "@utils/func";
import styles from "../index.module.scss";

const RightContent: React.FC = () => {
  const { setUserInfo } = useLoginStore();
  const { setColor, primaryColor } = useGlobalStore();
  const logoutHandle = () => {
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

  const changeMainColor = (e: ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  return (
    <>
      <div className={styles.skin}>
        <Button type="primary" shape="circle" icon={<SkinOutlined />} />
        <Input
          type="color"
          className={styles.skin_input}
          defaultValue={primaryColor}
          onChange={debounce(changeMainColor, 500)}
        ></Input>
      </div>
      <Dropdown menu={{ items }} placement="bottomRight">
        <Avatar icon={<UserOutlined />} style={{ cursor: "pointer" }} />
      </Dropdown>
    </>
  );
};

export default RightContent;
