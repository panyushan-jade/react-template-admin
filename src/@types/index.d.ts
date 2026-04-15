/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_APP_TITLE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare namespace Api {
  interface Response<T = any> {
    code: number
    message: string
    data: T
  }

  interface PageResponse<T> {
    list: T[]
    total: number
    page: number
    pageSize: number
  }
}

declare namespace User {
  interface Info {
    id: string | number
    username: string
    avatar?: string
    roles: string[]
    permissions: string[]
    [key: string]: any
  }

  interface LoginForm {
    username: string
    password: string
  }

  interface PhoneLoginForm {
    mobile: string
    captcha: string
  }
}

declare namespace Router {
  interface RouteMeta {
    title?: string
    icon?: string
    hidden?: boolean
    roles?: string[]
    permissions?: string[]
    keepAlive?: boolean
  }
}
