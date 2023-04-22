/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, Suspense, lazy } from "react";
import { ConfigProvider, Button, Input } from "antd";
// import BasicLayout from "./layout";
// import { debounce } from "./utils/func";
import "antd/dist/reset.css";

const BasicLayout = lazy(() => import("./layout"));

const App: React.FC = () => {
  // const [color, setColor] = useState("#247fff");
  // const onChange = (e: any) => {
  //   console.log("value: ", e.target.value);
  //   setColor(e.target.value);
  // };
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#247fff",
        },
      }}
    >
      {/* <Button
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
      ></Input> */}
      <Suspense fallback={"Loading~~~~~~~~"}>
        <BasicLayout />
      </Suspense>
    </ConfigProvider>
  );
};

export default App;
