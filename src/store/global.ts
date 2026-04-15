import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useGlobalStore = defineStore(
  'global',
  () => {
    const primaryColor = ref<string>('#247fff')
    const sidebarCollapsed = ref<boolean>(false)
    const locale = ref<string>('zh-CN')

    const isZhCN = computed(() => locale.value === 'zh-CN')

    function setPrimaryColor(color: string) {
      primaryColor.value = color
    }

    function toggleSidebar() {
      sidebarCollapsed.value = !sidebarCollapsed.value
    }

    function setSidebarCollapsed(collapsed: boolean) {
      sidebarCollapsed.value = collapsed
    }

    function setLocale(newLocale: string) {
      locale.value = newLocale
    }

    return {
      primaryColor,
      sidebarCollapsed,
      locale,
      isZhCN,
      setPrimaryColor,
      toggleSidebar,
      setSidebarCollapsed,
      setLocale,
    }
  },
  {
    persist: {
      key: 'global-store',
      storage: localStorage,
      paths: ['primaryColor', 'sidebarCollapsed', 'locale'],
    },
  }
)

export default useGlobalStore
