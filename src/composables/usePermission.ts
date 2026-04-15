import type { Directive, DirectiveBinding } from 'vue'
import { useUserStore } from '@store/user'

export const permission: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding<string | string[]>) {
    const userStore = useUserStore()
    const permissions = userStore.permissions
    const { value } = binding

    if (value) {
      const hasPermission = Array.isArray(value)
        ? value.some((v) => permissions.includes(v))
        : permissions.includes(value)

      if (!hasPermission) {
        el.parentNode?.removeChild(el)
      }
    } else {
      throw new Error('need permissions! Like v-permission="\'user:add\'" or v-permission="[\'user:add\', \'user:edit\']"')
    }
  },
}

export const role: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding<string | string[]>) {
    const userStore = useUserStore()
    const roles = userStore.roles
    const { value } = binding

    if (value) {
      const hasRole = Array.isArray(value)
        ? value.some((v) => roles.includes(v))
        : roles.includes(value)

      if (!hasRole) {
        el.parentNode?.removeChild(el)
      }
    } else {
      throw new Error('need roles! Like v-role="\'admin\'" or v-role="[\'admin\', \'user\']"')
    }
  },
}

export function usePermission() {
  const userStore = useUserStore()

  function hasPermission(permission: string | string[]): boolean {
    const permissions = userStore.permissions
    if (Array.isArray(permission)) {
      return permission.some((p) => permissions.includes(p))
    }
    return permissions.includes(permission)
  }

  function hasRole(role: string | string[]): boolean {
    const roles = userStore.roles
    if (Array.isArray(role)) {
      return role.some((r) => roles.includes(r))
    }
    return roles.includes(role)
  }

  return {
    hasPermission,
    hasRole,
    permissions: userStore.permissions,
    roles: userStore.roles,
  }
}
