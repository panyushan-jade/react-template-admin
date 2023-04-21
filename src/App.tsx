import React, { useState } from "react";
import { ConfigProvider, Button } from "antd";
import BasicLayout from "./layout";
import "antd/dist/reset.css";

const App: React.FC = () => {
  const [color, setColor] = useState("#00b96b");
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: color,
        },
      }}
    >
      <Button
        onClick={() => {
          setColor("#247fff");
        }}
      >
        切换主题
      </Button>
      <BasicLayout />
    </ConfigProvider>
  );
};

export default App;
