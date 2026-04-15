import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { login, logout, getUserInfo } from '@services/auth'
import { encrypt, decrypt } from '@utils/crypto'

const TOKEN_KEY = 'admin_token'
const USER_INFO_KEY = 'admin_user_info'

export const useUserStore = defineStore(
  'user',
  () => {
    const token = ref<string | null>(null)
    const userInfo = ref<User.Info | null>(null)

    const isLoggedIn = computed(() => !!token.value && !!userInfo.value)
    const roles = computed(() => userInfo.value?.roles || [])
    const permissions = computed(() => userInfo.value?.permissions || [])

    function setToken(newToken: string) {
      token.value = newToken
      localStorage.setItem(TOKEN_KEY, encrypt(newToken))
    }

    function clearToken() {
      token.value = null
      localStorage.removeItem(TOKEN_KEY)
    }

    function setUserInfo(info: User.Info) {
      userInfo.value = info
      localStorage.setItem(USER_INFO_KEY, encrypt(JSON.stringify(info)))
    }

    function clearUserInfo() {
      userInfo.value = null
      localStorage.removeItem(USER_INFO_KEY)
    }

    function restoreFromStorage() {
      const encryptedToken = localStorage.getItem(TOKEN_KEY)
      const encryptedUserInfo = localStorage.getItem(USER_INFO_KEY)

      if (encryptedToken) {
        try {
          token.value = decrypt(encryptedToken)
        } catch {
          clearToken()
        }
      }

      if (encryptedUserInfo) {
        try {
          userInfo.value = JSON.parse(decrypt(encryptedUserInfo))
        } catch {
          clearUserInfo()
        }
      }
    }

    async function loginAction(formData: User.LoginForm | User.PhoneLoginForm) {
      try {
        const response = await login(formData)
        if (response.code === 200) {
          const { token: newToken, userInfo: info } = response.data
          setToken(newToken)
          setUserInfo(info)
          return { success: true }
        }
        return { success: false, message: response.message }
      } catch (error: any) {
        return { success: false, message: error.message || '登录失败' }
      }
    }

    async function logoutAction() {
      try {
        await logout()
      } finally {
        clearToken()
        clearUserInfo()
      }
    }

    async function fetchUserInfo() {
      try {
        const response = await getUserInfo()
        if (response.code === 200) {
          setUserInfo(response.data)
          return { success: true }
        }
        return { success: false }
      } catch {
        return { success: false }
      }
    }

    function hasPermission(permission: string): boolean {
      return permissions.value.includes(permission)
    }

    function hasRole(role: string): boolean {
      return roles.value.includes(role)
    }

    return {
      token,
      userInfo,
      isLoggedIn,
      roles,
      permissions,
      setToken,
      clearToken,
      setUserInfo,
      clearUserInfo,
      restoreFromStorage,
      loginAction,
      logoutAction,
      fetchUserInfo,
      hasPermission,
      hasRole,
    }
  },
  {
    persist: {
      key: 'user-store',
      storage: localStorage,
      paths: ['token', 'userInfo'],
    },
  }
)

export default useUserStore
