import React, { useState } from "react";
import { ConfigProvider, Button, Input } from "antd";
import BasicLayout from "./layout";
import { debounce } from "./utils/func";
import "antd/dist/reset.css";

const App: React.FC = () => {
  const [color, setColor] = useState("#247fff");
  const onChange = (e: any) => {
    console.log("value: ", e.target.value);
    setColor(e.target.value);
  };
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
      <Input
        type="color"
        defaultValue="#247fff"
        onChange={debounce(onChange, 500)}
      ></Input>
      <BasicLayout />
    </ConfigProvider>
  );
};

export default App;
