import React from "react";
import { Column } from "@ant-design/plots";
import {
  CHART_COLORS,
  COMMON_CONFIG,
  createAxisConfig,
} from "@utils/chartConfig";

const data = [
  { type: "家具家电", sales: 38 },
  { type: "粮油副食", sales: 52 },
  { type: "生鲜水果", sales: 61 },
  { type: "美容洗护", sales: 145 },
  { type: "母婴用品", sales: 48 },
  { type: "进口食品", sales: 38 },
  { type: "食品饮料", sales: 38 },
  { type: "家庭清洁", sales: 38 },
];

const DemoColumn = () => {
  const config = {
    ...COMMON_CONFIG,
    height: 350,
    data,
    xField: "type",
    yField: "sales",
    color: CHART_COLORS.primary,
    label: {
      style: { fill: "#FFFFFF", opacity: 0.6 },
    },
    ...createAxisConfig({ xAlias: "类别", yAlias: "销售额" }),
  };

  return <Column {...config} />;
};

export default DemoColumn;
