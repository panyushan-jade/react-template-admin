import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { constantRoutes, asyncRoutes } from '@config/router'
import { useUserStore } from './user'

export const usePermissionStore = defineStore('permission', () => {
  const routes = ref<RouteRecordRaw[]>([])
  const addRoutes = ref<RouteRecordRaw[]>([])

  const menuRoutes = computed(() => {
    return routes.value.filter((route) => !route.meta?.hidden)
  })

  function hasPermission(route: RouteRecordRaw, roles: string[]): boolean {
    if (route.meta?.roles) {
      return roles.some((role) => (route.meta?.roles as string[]).includes(role))
    }
    return true
  }

  function filterAsyncRoutes(routes: RouteRecordRaw[], roles: string[]): RouteRecordRaw[] {
    const res: RouteRecordRaw[] = []

    routes.forEach((route) => {
      const tmp = { ...route }
      if (hasPermission(tmp, roles)) {
        if (tmp.children) {
          tmp.children = filterAsyncRoutes(tmp.children, roles)
        }
        res.push(tmp)
      }
    })

    return res
  }

  function generateRoutes(roles: string[]): RouteRecordRaw[] {
    let accessedRoutes: RouteRecordRaw[]

    if (roles.includes('admin')) {
      accessedRoutes = asyncRoutes || []
    } else {
      accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
    }

    addRoutes.value = accessedRoutes
    routes.value = constantRoutes.concat(accessedRoutes)

    return accessedRoutes
  }

  function resetRoutes() {
    routes.value = []
    addRoutes.value = []
  }

  return {
    routes,
    addRoutes,
    menuRoutes,
    generateRoutes,
    resetRoutes,
  }
})

export function setupPermissionGuard() {
  const userStore = useUserStore()
  const permissionStore = usePermissionStore()

  if (userStore.roles.length > 0) {
    permissionStore.generateRoutes(userStore.roles)
  }
}

export default usePermissionStore
