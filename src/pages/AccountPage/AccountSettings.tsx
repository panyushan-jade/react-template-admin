import { ProCard } from "@ant-design/pro-components";
import React, { useState } from "react";

const AccountSettings: React.FC = () => {
  const [tab, setTab] = useState("tab1");
  return (
    <ProCard
      style={{ height: "100%" }}
      tabs={{
        tabPosition: "left",
        activeKey: tab,
        items: [
          {
            label: `基本设置`,
            key: "tab1",
            children: `基本设置`,
          },
          {
            label: `新消息通知`,
            key: "tab2",
            children: `新消息通知`,
          },
        ],
        onChange: (key) => {
          setTab(key);
        },
      }}
    />
  );
};

export default AccountSettings;
