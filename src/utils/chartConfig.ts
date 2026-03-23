export const CHART_COLORS = {
  primary: "#1677FF",
  success: "#52c41a",
  warning: "#faad14",
  error: "#ff4d4f",
  series: ["#1677FF", "#52c41a", "#faad14", "#ff4d4f", "#722ed1", "#13c2c2"],
};

export const COMMON_CONFIG = {
  height: 300,
  animation: true,
  autoFit: true,
};

export const formatNumber = (value: number | string): string =>
  `${value}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`);

export const formatCurrency = (value: number): string =>
  `¥${formatNumber(value.toFixed(2))}`;

export const createAxisConfig = (options?: {
  xAlias?: string;
  yAlias?: string;
  formatY?: boolean;
}) => ({
  xAxis: {
    label: {
      autoHide: true,
      autoRotate: false,
    },
  },
  yAxis: options?.formatY
    ? {
        label: {
          formatter: (v: string) => formatNumber(v),
        },
      }
    : {},
  meta: {
    ...(options?.xAlias && { type: { alias: options.xAlias } }),
    ...(options?.yAlias && { value: { alias: options.yAlias } }),
  },
});

export const createLabelConfig = (position: "inner" | "outer" = "outer") => ({
  type: position,
  content: position === "outer" ? "{name} {percentage}" : "{value}",
  style: {
    fill: "#666",
    opacity: 0.8,
  },
});

export const createInteractions = (types: string[] = ["element-active"]) =>
  types.map((type) => ({ type }));
