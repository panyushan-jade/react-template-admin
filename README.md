# React Template Admin

一个轻量级的 React 18 后台管理系统模板，开箱即用。

## 特性

- 🚀 **最新技术栈** - React 18 + TypeScript + Vite
- 📦 **组件丰富** - 基于 Ant Design 5 + ProComponents
- 🎨 **主题定制** - 支持动态主题色切换
- 📊 **数据可视化** - 集成 @ant-design/plots 图表库
- 🔐 **权限管理** - 内置登录认证流程
- 📱 **响应式设计** - 完美适配各种屏幕尺寸
- 🛠️ **工程化** - ESLint + Prettier + Husky + Commitlint

## 目录结构

```
src/
├── components/          # 公共组件
│   ├── ErrorPage/       # 错误页面
│   └── NoAuthPage/      # 无权限页面
├── config/              # 配置文件
│   └── router.tsx       # 路由配置
├── layout/              # 布局组件
│   ├── components/
│   │   ├── Header.tsx   # 头部组件
│   │   ├── Login.tsx    # 登录页面
│   │   └── RightContent.tsx
│   └── index.tsx        # 主布局
├── pages/               # 页面组件
│   ├── Dashboard/       # 仪表盘
│   ├── FormPage/        # 表单页
│   ├── TablePage/       # 列表页
│   ├── DetailPage/      # 详情页
│   └── AccountPage/     # 个人中心/设置
├── services/            # API 服务
├── stores/              # 状态管理 (Zustand)
├── utils/               # 工具函数
│   ├── request.ts       # HTTP 请求封装
│   ├── func.ts          # 通用工具函数
│   └── chartConfig.ts   # 图表配置
└── global.d.ts          # 类型声明
```

## 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0 或 pnpm >= 7.0.0

### 安装依赖

```bash
npm install
# 或
pnpm install
```

### 启动开发服务器

```bash
npm run start
```

访问 http://localhost:5173 查看应用。

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 页面说明

### 仪表盘 (Dashboard)

路径: `/`

展示数据统计和图表：

- 统计卡片：支付金额、访客数、订单数、浏览量
- 折线图：趋势数据展示
- 柱状图：分类数据对比
- 饼图：占比数据展示

### 表单页 (FormPage)

路径: `/form`

完整的表单示例，包含：

- 表单验证
- 级联选择
- 自动完成
- 密码确认

### 列表页 (TablePage)

路径: `/table`

高级表格功能：

- 搜索过滤
- 可编辑行
- 排序功能
- 操作按钮

### 详情页 (DetailPage)

路径: `/detail`

订单详情展示：

- 金额卡片
- 订单信息
- 用户信息
- 商品列表
- 物流进度时间线

### 个人中心 (AccountCenter)

路径: `/account/center`

用户个人信息展示。

### 个人设置 (AccountSettings)

路径: `/account/settings`

用户设置页面。

## 核心功能

### 状态管理

使用 Zustand 进行状态管理，支持持久化存储。

```typescript
// stores/global.ts - 全局状态
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GlobalState {
  primaryColor: string;
  setColor: (color: string) => void;
}

export const useGlobalStore = create<GlobalState>()(
  persist(
    (set) => ({
      primaryColor: "#247fff",
      setColor: (color) => set({ primaryColor: color }),
    }),
    { name: "global-storage" }
  )
);
```

### HTTP 请求

封装了 Axios，支持请求/响应拦截器。

```typescript
import http from "@utils/request";

// GET 请求
const response = await http.get("/api/users", { page: 1 });

// POST 请求
const response = await http.post("/api/users", { name: "John" });

// PUT 请求
const response = await http.put("/api/users/1", { name: "Jane" });

// DELETE 请求
const response = await http.delete("/api/users/1");
```

### 路由配置

路由配置位于 `src/config/router.tsx`，支持懒加载和嵌套路由。

```typescript
const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "form", element: <FormPage /> },
      // ...
    ],
  },
];
```

### 图表配置

统一的图表配置，便于维护和扩展。

```typescript
import {
  CHART_COLORS,
  COMMON_CONFIG,
  createAxisConfig,
} from "@utils/chartConfig";

const config = {
  ...COMMON_CONFIG,
  data: yourData,
  xField: "x",
  yField: "y",
  color: CHART_COLORS.primary,
  ...createAxisConfig({ formatY: true }),
};
```

## 工具函数

### 防抖 (debounce)

```typescript
import { debounce } from "@utils/func";

const debouncedFn = debounce((value) => {
  console.log(value);
}, 300);
```

### 节流 (throttle)

```typescript
import { throttle } from "@utils/func";

const throttledFn = throttle((value) => {
  console.log(value);
}, 300);
```

### 日期格式化 (formatDate)

```typescript
import { formatDate } from "@utils/func";

formatDate(new Date()); // "2024-01-15 14:30:25"
formatDate(new Date(), "YYYY-MM-DD"); // "2024-01-15"
```

### 深拷贝 (deepClone)

```typescript
import { deepClone } from "@utils/func";

const cloned = deepClone(originalObject);
```

## 主题定制

### 动态切换主题色

在头部右侧点击颜色选择器即可切换主题色。

### 修改默认主题色

编辑 `src/stores/global.ts`：

```typescript
primaryColor: "#your-color",
```

### 自定义主题变量

创建 `.env` 文件：

```
VITE_API_BASE_URL=https://your-api.com
VITE_APP_TITLE=Your App Name
```

## 代码规范

### 提交规范

使用 Commitizen 规范提交信息：

```bash
npm run commit
```

提交类型：

- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建/工具相关

### 代码检查

```bash
# 运行 ESLint
npm run lint

# 自动修复
npm run lint -- --fix
```

## 扩展指南

### 添加新页面

1. 在 `src/pages/` 下创建页面组件
2. 在 `src/pages/index.ts` 中导出
3. 在 `src/config/router.tsx` 中添加路由
4. 在 `src/layout/index.tsx` 中添加菜单项

### 添加新 API

1. 在 `src/services/` 下创建服务文件
2. 使用 `http` 实例发起请求

```typescript
// services/user.ts
import http from "@utils/request";

export const getUserList = () => http.get("/api/users");
export const createUser = (data) => http.post("/api/users", data);
```

### 添加新图表

1. 在 `src/pages/Dashboard/components/` 下创建图表组件
2. 使用 `@utils/chartConfig` 中的通用配置
3. 在 Dashboard 页面引入并使用

## 常见问题

### Q: 如何修改端口？

A: 修改 `vite.config.ts`：

```typescript
export default defineConfig({
  server: {
    port: 3000,
  },
});
```

### Q: 如何配置代理？

A: 修改 `vite.config.ts`：

```typescript
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://your-api-server.com",
        changeOrigin: true,
      },
    },
  },
});
```

### Q: 如何添加权限控制？

A: 在路由配置中使用 `loader` 进行权限验证：

```typescript
const routes = [
  {
    path: "/admin",
    element: <AdminPage />,
    loader: authLoader,
  },
];
```

## 技术栈

| 技术          | 版本   | 说明      |
| ------------- | ------ | --------- |
| React         | 18.2.0 | UI 框架   |
| TypeScript    | 4.9.5  | 类型支持  |
| Vite          | 4.3.3  | 构建工具  |
| Ant Design    | 5.4.2  | UI 组件库 |
| ProComponents | 2.4.4  | 高级组件  |
| Zustand       | 4.3.7  | 状态管理  |
| React Router  | 6.10.0 | 路由管理  |
| Axios         | 1.3.6  | HTTP 请求 |
| Day.js        | 1.11.7 | 日期处理  |

## License

MIT
