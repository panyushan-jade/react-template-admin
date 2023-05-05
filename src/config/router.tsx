import React, { lazy } from "react";
import ErrorPage from "@components/ErrorPage";
import LoginPage from "../layout/components/Login";
// FormPage
import App, { authLoader } from "../App";
import { createBrowserRouter, Navigate } from "react-router-dom";
import {
  // AppstoreOutlined,
  // BarChartOutlined,
  DashboardOutlined,
  EditOutlined,
  TableOutlined,
  BarsOutlined,
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
const DetailPage = lazy(() => import("../pages/DetailPage"));

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
            icon: <DashboardOutlined />,
            element: <Dashboard />,
          },
          {
            path: "form",
            title: "表单页",
            icon: <EditOutlined />,
            element: <FormPage />,
          },
          {
            path: "table",
            title: "列表页",
            icon: <TableOutlined />,
            element: <TablePage />,
          },
          {
            path: "detail",
            title: "详情页",
            icon: <BarsOutlined />,
            element: <DetailPage />,
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
