import { ref, reactive, computed } from 'vue'
import type { TableItem, TableParams } from '@services/table'
import { getTable } from '@services/table'

export interface UseTableOptions {
  immediate?: boolean
  defaultPageSize?: number
}

export function useTable(options: UseTableOptions = {}) {
  const { immediate = true, defaultPageSize = 10 } = options

  const loading = ref(false)
  const data = ref<TableItem[]>([])
  const total = ref(0)

  const pagination = reactive({
    currentPage: 1,
    pageSize: defaultPageSize,
  })

  const searchParams = reactive<TableParams>({
    page: 1,
    pageSize: defaultPageSize,
  })

  const hasData = computed(() => data.value.length > 0)

  async function fetchData() {
    loading.value = true
    try {
      const params = {
        ...searchParams,
        page: pagination.currentPage,
        pageSize: pagination.pageSize,
      }
      const response = await getTable(params)
      if (response.code === 200) {
        data.value = response.data.list
        total.value = response.data.total
      }
    } finally {
      loading.value = false
    }
  }

  function handleSizeChange(size: number) {
    pagination.pageSize = size
    pagination.currentPage = 1
    fetchData()
  }

  function handleCurrentChange(page: number) {
    pagination.currentPage = page
    fetchData()
  }

  function handleSearch(params: Partial<TableParams>) {
    Object.assign(searchParams, params)
    pagination.currentPage = 1
    fetchData()
  }

  function handleReset() {
    Object.keys(searchParams).forEach((key) => {
      ;(searchParams as any)[key] = undefined
    })
    pagination.currentPage = 1
    fetchData()
  }

  function refresh() {
    fetchData()
  }

  if (immediate) {
    fetchData()
  }

  return {
    loading,
    data,
    total,
    pagination,
    searchParams,
    hasData,
    fetchData,
    handleSizeChange,
    handleCurrentChange,
    handleSearch,
    handleReset,
    refresh,
  }
}
