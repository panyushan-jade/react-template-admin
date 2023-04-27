import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/plots";

const DemoLine = () => {
  const [foldLineData, setFoldLineData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(
      "https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json"
    )
      .then((response) => response.json())
      .then((json) => setFoldLineData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };
  const config = {
    data: foldLineData,
    xField: "year",
    yField: "value",
    seriesField: "category",
    height: 300,
    yAxis: {
      label: {
        // 数值格式化为千分位
        formatter: (v: any) =>
          `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    color: ["#1979C9", "#D62A0D", "#FAA219"],
  };
  return <Line {...config} />;
};

export default DemoLine;
