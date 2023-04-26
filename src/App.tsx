import React, { Suspense, lazy } from "react";
import { ConfigProvider, Spin } from "antd";
import { useGlobalStore } from "src/stores";
import "antd/dist/reset.css";

const BasicLayout = lazy(() => import("./layout"));

export function authLoader() {
  return { isAdmin: true };
}

const App: React.FC = () => {
  const { primaryColor } = useGlobalStore();
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: primaryColor,
        },
      }}
    >
      <Suspense fallback={<Spin size="large" className="globa_spin" />}>
        <BasicLayout />
      </Suspense>
    </ConfigProvider>
  );
};
export default App;
