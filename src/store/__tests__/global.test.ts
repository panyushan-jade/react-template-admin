import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useGlobalStore } from '../global'

describe('global store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const store = useGlobalStore()

      expect(store.primaryColor).toBe('#247fff')
      expect(store.sidebarCollapsed).toBe(false)
      expect(store.locale).toBe('zh-CN')
    })

    it('should have correct computed values', () => {
      const store = useGlobalStore()

      expect(store.isZhCN).toBe(true)

      store.setLocale('en-US')
      expect(store.isZhCN).toBe(false)
    })
  })

  describe('actions', () => {
    it('should set primary color', () => {
      const store = useGlobalStore()

      store.setPrimaryColor('#ff0000')
      expect(store.primaryColor).toBe('#ff0000')
    })

    it('should toggle sidebar', () => {
      const store = useGlobalStore()

      expect(store.sidebarCollapsed).toBe(false)

      store.toggleSidebar()
      expect(store.sidebarCollapsed).toBe(true)

      store.toggleSidebar()
      expect(store.sidebarCollapsed).toBe(false)
    })

    it('should set sidebar collapsed', () => {
      const store = useGlobalStore()

      store.setSidebarCollapsed(true)
      expect(store.sidebarCollapsed).toBe(true)

      store.setSidebarCollapsed(false)
      expect(store.sidebarCollapsed).toBe(false)
    })

    it('should set locale', () => {
      const store = useGlobalStore()

      store.setLocale('en-US')
      expect(store.locale).toBe('en-US')

      store.setLocale('zh-CN')
      expect(store.locale).toBe('zh-CN')
    })
  })
})
