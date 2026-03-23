declare module "*.less" {
  const style: { [className: string]: string };
  export default style;
}

declare module "*.scss" {
  const style: { [className: string]: string };
  export default style;
}

declare module "*.css";
declare module "*.less";
declare module "*.sass";
declare module "*.svg";
declare module "*.webp";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.bmp";
declare module "*.tiff";

interface UserInfo {
  id: string;
  username: string;
  nickname?: string;
  avatar?: string;
  email?: string;
  phone?: string;
  roles?: string[];
}

interface MenuItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  children?: MenuItem[];
  path?: string;
  hideInMenu?: boolean;
}

interface TableListItem {
  id: string | number;
  [key: string]: unknown;
}

interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
  success: boolean;
}

interface PaginationParams {
  current: number;
  pageSize: number;
  total?: number;
}

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_APP_TITLE: string;
  readonly MODE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
