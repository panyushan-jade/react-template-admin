import http from '@utils/request'

export interface LoginParams {
  username?: string
  password?: string
  mobile?: string
  captcha?: string
}

export interface LoginResult {
  token: string
  userInfo: User.Info
}

export async function login(params: LoginParams) {
  return new Promise<Api.Response<LoginResult>>((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        message: '登录成功',
        data: {
          token: 'mock-token-' + Date.now(),
          userInfo: {
            id: 1,
            username: params.username || params.mobile || 'admin',
            avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
            roles: ['admin'],
            permissions: ['dashboard:view', 'form:view', 'table:view', 'table:add', 'table:edit', 'table:delete', 'detail:view', 'account:view'],
          },
        },
      })
    }, 1000)
  })
}

export async function logout() {
  return new Promise<Api.Response<null>>((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        message: '退出成功',
        data: null,
      })
    }, 300)
  })
}

export async function getUserInfo() {
  return new Promise<Api.Response<User.Info>>((resolve) => {
    setTimeout(() => {
      resolve({
        code: 200,
        message: '获取成功',
        data: {
          id: 1,
          username: 'admin',
          avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
          roles: ['admin'],
          permissions: ['dashboard:view', 'form:view', 'table:view', 'table:add', 'table:edit', 'table:delete', 'detail:view', 'account:view'],
        },
      })
    }, 300)
  })
}
