import React, { Suspense, lazy } from "react";
import { ConfigProvider } from "antd";
import { useGlobalStore } from "src/stores";
import "antd/dist/reset.css";

const BasicLayout = lazy(() => import("./layout"));

const App: React.FC = () => {
  const { primaryColor } = useGlobalStore();
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: primaryColor || "#247fff",
        },
      }}
    >
      <Suspense fallback={"Loading~~~~~~~~"}>
        <BasicLayout />
      </Suspense>
    </ConfigProvider>
  );
};

export default App;
