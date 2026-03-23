import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { message } from "antd";

interface IRequestOptions {
  url: string;
  method?: AxiosRequestConfig["method"];
  data?: AxiosRequestConfig["data"];
  params?: AxiosRequestConfig["params"];
  headers?: AxiosRequestConfig["headers"];
  timeout?: number;
}

interface IResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
  success: boolean;
}

const DEFAULT_TIMEOUT = 10000;
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

class HttpClient {
  private readonly instance: AxiosInstance;

  constructor(baseURL: string = BASE_URL) {
    this.instance = axios.create({
      baseURL,
      timeout: DEFAULT_TIMEOUT,
      headers: { "Content-Type": "application/json" },
    });
    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("token");
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        const status = error.response?.status;
        const errorMsg =
          error.response?.data?.message || error.message || "请求失败";

        if (status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        } else if (status === 403) {
          message.error("没有权限访问");
        } else if (status === 404) {
          message.error("请求的资源不存在");
        } else if (status >= 500) {
          message.error("服务器错误，请稍后重试");
        } else {
          message.error(errorMsg);
        }

        return Promise.reject(error);
      }
    );
  }

  public async request<T = unknown>(
    options: IRequestOptions
  ): Promise<IResponse<T>> {
    const { url, method = "GET", data, params, headers, timeout } = options;

    const response = await this.instance.request<T>({
      url,
      method,
      data,
      params,
      headers,
      timeout,
    });

    return {
      code: response.status,
      message: response.statusText,
      data: response.data,
      success: response.status >= 200 && response.status < 300,
    };
  }

  public get<T = unknown>(
    url: string,
    params?: Record<string, unknown>
  ): Promise<IResponse<T>> {
    return this.request<T>({ url, method: "GET", params });
  }

  public post<T = unknown>(url: string, data?: unknown): Promise<IResponse<T>> {
    return this.request<T>({ url, method: "POST", data });
  }

  public put<T = unknown>(url: string, data?: unknown): Promise<IResponse<T>> {
    return this.request<T>({ url, method: "PUT", data });
  }

  public delete<T = unknown>(url: string): Promise<IResponse<T>> {
    return this.request<T>({ url, method: "DELETE" });
  }
}

const http = new HttpClient();

export default http;
export type { IResponse, IRequestOptions };
