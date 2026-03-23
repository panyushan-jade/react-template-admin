import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/plots";
import {
  CHART_COLORS,
  COMMON_CONFIG,
  createAxisConfig,
} from "@utils/chartConfig";

const DemoLine = () => {
  const [foldLineData, setFoldLineData] = useState([]);

  useEffect(() => {
    fetch(
      "https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json"
    )
      .then((response) => response.json())
      .then((json) => setFoldLineData(json))
      .catch((error) => console.log("fetch data failed", error));
  }, []);

  const config = {
    ...COMMON_CONFIG,
    data: foldLineData,
    xField: "year",
    yField: "value",
    seriesField: "category",
    color: CHART_COLORS.series.slice(0, 3),
    ...createAxisConfig({ formatY: true }),
  };

  return <Line {...config} />;
};

export default DemoLine;
