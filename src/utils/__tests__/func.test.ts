import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { debounce, throttle, deepClone, formatFileSize, generateUUID, isObject, isEmpty } from '../func'

describe('func utils', () => {
  describe('debounce', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('should debounce function calls', () => {
      const mockFn = vi.fn()
      const debouncedFn = debounce(mockFn, 100)

      debouncedFn('arg1')
      debouncedFn('arg2')
      debouncedFn('arg3')

      expect(mockFn).not.toHaveBeenCalled()

      vi.advanceTimersByTime(100)

      expect(mockFn).toHaveBeenCalledTimes(1)
      expect(mockFn).toHaveBeenCalledWith('arg3')
    })

    it('should call function after delay', () => {
      const mockFn = vi.fn()
      const debouncedFn = debounce(mockFn, 200)

      debouncedFn('test')

      vi.advanceTimersByTime(100)
      expect(mockFn).not.toHaveBeenCalled()

      vi.advanceTimersByTime(100)
      expect(mockFn).toHaveBeenCalledTimes(1)
    })
  })

  describe('throttle', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('should throttle function calls', () => {
      const mockFn = vi.fn()
      const throttledFn = throttle(mockFn, 100)

      throttledFn('arg1')
      throttledFn('arg2')
      throttledFn('arg3')

      expect(mockFn).toHaveBeenCalledTimes(1)
      expect(mockFn).toHaveBeenCalledWith('arg1')

      vi.advanceTimersByTime(50)
      throttledFn('arg4')
      expect(mockFn).toHaveBeenCalledTimes(1)

      vi.advanceTimersByTime(50)
      throttledFn('arg5')
      expect(mockFn).toHaveBeenCalledTimes(2)
      expect(mockFn).toHaveBeenLastCalledWith('arg5')
    })
  })

  describe('deepClone', () => {
    it('should clone primitive values', () => {
      expect(deepClone(42)).toBe(42)
      expect(deepClone('string')).toBe('string')
      expect(deepClone(true)).toBe(true)
      expect(deepClone(null)).toBe(null)
      expect(deepClone(undefined)).toBe(undefined)
    })

    it('should clone objects', () => {
      const obj = { a: 1, b: { c: 2 } }
      const cloned = deepClone(obj)

      expect(cloned).toEqual(obj)
      expect(cloned).not.toBe(obj)
      expect(cloned.b).not.toBe(obj.b)
    })

    it('should clone arrays', () => {
      const arr = [1, [2, 3], { a: 4 }]
      const cloned = deepClone(arr)

      expect(cloned).toEqual(arr)
      expect(cloned).not.toBe(arr)
      expect(cloned[1]).not.toBe(arr[1])
      expect(cloned[2]).not.toBe(arr[2])
    })

    it('should clone dates', () => {
      const date = new Date('2024-01-01')
      const cloned = deepClone(date)

      expect(cloned).toEqual(date)
      expect(cloned).not.toBe(date)
      expect(cloned.getTime()).toBe(date.getTime())
    })
  })

  describe('formatFileSize', () => {
    it('should format 0 bytes', () => {
      expect(formatFileSize(0)).toBe('0 B')
    })

    it('should format bytes', () => {
      expect(formatFileSize(500)).toBe('500.00 B')
    })

    it('should format kilobytes', () => {
      expect(formatFileSize(1024)).toBe('1.00 KB')
      expect(formatFileSize(1536)).toBe('1.50 KB')
    })

    it('should format megabytes', () => {
      expect(formatFileSize(1024 * 1024)).toBe('1.00 MB')
    })

    it('should format gigabytes', () => {
      expect(formatFileSize(1024 * 1024 * 1024)).toBe('1.00 GB')
    })
  })

  describe('generateUUID', () => {
    it('should generate valid UUID format', () => {
      const uuid = generateUUID()
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

      expect(uuidRegex.test(uuid)).toBe(true)
    })

    it('should generate unique UUIDs', () => {
      const uuids = new Set()
      for (let i = 0; i < 100; i++) {
        uuids.add(generateUUID())
      }
      expect(uuids.size).toBe(100)
    })
  })

  describe('isObject', () => {
    it('should return true for objects', () => {
      expect(isObject({})).toBe(true)
      expect(isObject({ a: 1 })).toBe(true)
    })

    it('should return false for non-objects', () => {
      expect(isObject(null)).toBe(false)
      expect(isObject(undefined)).toBe(false)
      expect(isObject(42)).toBe(false)
      expect(isObject('string')).toBe(false)
      expect(isObject(true)).toBe(false)
      expect(isObject([])).toBe(false)
      expect(isObject(() => {})).toBe(false)
    })
  })

  describe('isEmpty', () => {
    it('should return true for empty values', () => {
      expect(isEmpty(null)).toBe(true)
      expect(isEmpty(undefined)).toBe(true)
      expect(isEmpty('')).toBe(true)
      expect(isEmpty('   ')).toBe(true)
      expect(isEmpty([])).toBe(true)
      expect(isEmpty({})).toBe(true)
    })

    it('should return false for non-empty values', () => {
      expect(isEmpty('hello')).toBe(false)
      expect(isEmpty([1, 2, 3])).toBe(false)
      expect(isEmpty({ a: 1 })).toBe(false)
      expect(isEmpty(0)).toBe(false)
      expect(isEmpty(false)).toBe(false)
    })
  })
})
