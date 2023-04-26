import React, { lazy } from "react";
import { ErrorPage } from "src/pages";
import LoginPage from "../layout/components/Login";
// FormPage
import App, { authLoader } from "src/App";
import { createBrowserRouter, Navigate } from "react-router-dom";
import {
  AppstoreOutlined,
  BarChartOutlined,
  // CloudOutlined,
  // ShopOutlined,
  // TeamOutlined,
  // UploadOutlined,
  // UserOutlined,
  // VideoCameraOutlined,
} from "@ant-design/icons";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const FormPage = lazy(() => import("../pages/FormPage"));
const TablePage = lazy(() => import("../pages/TablePage"));

const routes = [
  {
    path: "/",
    element: <App />,
    loader: authLoader,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            title: "Dashboard",
            icon: <AppstoreOutlined />,
            element: <Dashboard />,
          },
          {
            path: "form",
            title: "Form",
            icon: <BarChartOutlined />,
            element: <FormPage />,
          },
          {
            path: "table",
            title: "Table",
            icon: <BarChartOutlined />,
            element: <TablePage />,
          },
          {
            path: "*",
            element: <Navigate to="/" replace={true} />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
];

export { routes };

export default createBrowserRouter(routes);
