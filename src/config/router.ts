import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@store/user'
import { usePermissionStore } from '@store/permission'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@pages/Login/index.vue'),
    meta: {
      title: '登录',
      hidden: true,
    },
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@components/ErrorPage/index.vue'),
    meta: {
      title: '404',
      hidden: true,
    },
  },
  {
    path: '/401',
    name: 'NoAuth',
    component: () => import('@components/NoAuthPage/index.vue'),
    meta: {
      title: '401',
      hidden: true,
    },
  },
]

export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@layouts/index.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@pages/Dashboard/index.vue'),
        meta: {
          title: 'Dashboard',
          icon: 'DataLine',
        },
      },
      {
        path: '/form',
        name: 'Form',
        component: () => import('@pages/FormPage/index.vue'),
        meta: {
          title: '表单页',
          icon: 'Edit',
        },
      },
      {
        path: '/table',
        name: 'Table',
        component: () => import('@pages/TablePage/index.vue'),
        meta: {
          title: '列表页',
          icon: 'Grid',
        },
      },
      {
        path: '/detail',
        name: 'Detail',
        component: () => import('@pages/DetailPage/index.vue'),
        meta: {
          title: '详情页',
          icon: 'Document',
        },
      },
      {
        path: '/account',
        name: 'Account',
        redirect: '/account/center',
        meta: {
          title: '个人页',
          icon: 'User',
        },
        children: [
          {
            path: '/account/center',
            name: 'AccountCenter',
            component: () => import('@pages/AccountPage/AccountCenter.vue'),
            meta: {
              title: '个人中心',
            },
          },
          {
            path: '/account/settings',
            name: 'AccountSettings',
            component: () => import('@pages/AccountPage/AccountSettings.vue'),
            meta: {
              title: '个人设置',
            },
          },
        ],
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})

const whiteList = ['/login', '/404', '/401']

export function resetRouter() {
  const newRouter = createRouter({
    history: createWebHistory(),
    routes: constantRoutes,
    scrollBehavior: () => ({ left: 0, top: 0 }),
  })
  ;(router as any).matcher = (newRouter as any).matcher
}

router.beforeEach(async (to, _from, next) => {
  NProgress.start()

  const userStore = useUserStore()
  const permissionStore = usePermissionStore()

  const hasToken = userStore.token

  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasRoutes = permissionStore.routes.length > 0

      if (hasRoutes) {
        next()
      } else {
        try {
          const hasRoles = userStore.roles && userStore.roles.length > 0

          if (!hasRoles) {
            await userStore.fetchUserInfo()
          }

          const roles = userStore.roles
          const accessRoutes = permissionStore.generateRoutes(roles)

          accessRoutes.forEach((route) => {
            router.addRoute(route)
          })

          router.addRoute({
            path: '/:pathMatch(.*)*',
            redirect: '/404',
          })

          next({ ...to, replace: true })
        } catch (error) {
          await userStore.logoutAction()
          permissionStore.resetRoutes()
          resetRouter()
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
