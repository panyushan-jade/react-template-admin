<template>
  <div class="table-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="card-title">高级表格</span>
          <div class="header-actions">
            <el-button type="primary" :icon="Plus" @click="handleAdd">
              新建
            </el-button>
            <el-dropdown>
              <el-button :icon="MoreFilled">
                更多
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>1st item</el-dropdown-item>
                  <el-dropdown-item>2nd item</el-dropdown-item>
                  <el-dropdown-item>3rd item</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </template>

      <el-form :model="searchForm" inline class="search-form">
        <el-form-item label="标题">
          <el-input
            v-model="searchForm.keyword"
            placeholder="请输入标题"
            clearable
            @keyup.enter="handleSearch"
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.state" placeholder="请选择状态" clearable>
            <el-option label="未解决" value="open" />
            <el-option label="已解决" value="closed" />
            <el-option label="解决中" value="processing" />
          </el-select>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="searchForm.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">
            搜索
          </el-button>
          <el-button :icon="Refresh" @click="handleReset">
            重置
          </el-button>
        </el-form-item>
      </el-form>

      <el-table
        v-loading="loading"
        :data="tableData"
        stripe
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="title" label="标题" min-width="200" show-overflow-tooltip>
          <template #default="{ row }">
            <el-tooltip :content="row.title" placement="top">
              <span>{{ row.title }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="状态" width="120" align="center">
          <template #default="{ row }">
            <el-tag :type="getStateType(row.state)" effect="dark">
              {{ getStateText(row.state) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="labels" label="标签" min-width="150">
          <template #default="{ row }">
            <el-tag
              v-for="label in row.labels"
              :key="label.name"
              :style="{ backgroundColor: label.color, marginRight: '4px' }"
              size="small"
              effect="dark"
            >
              {{ label.name }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="创建时间" width="180" align="center">
          <template #default="{ row }">
            {{ formatDate(row.created_at) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right" align="center">
          <template #default="{ row }">
            <el-button type="primary" link :icon="Edit" @click="handleEdit(row)">
              编辑
            </el-button>
            <el-button type="primary" link :icon="View" @click="handleView(row)">
              查看
            </el-button>
            <el-dropdown @command="(command) => handleCommand(command, row)">
              <el-button type="primary" link :icon="More">
                更多
              </el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="copy">
                    <el-icon><CopyDocument /></el-icon>
                    复制
                  </el-dropdown-item>
                  <el-dropdown-item command="delete" divided>
                    <el-icon><Delete /></el-icon>
                    删除
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-wrapper">
        <el-pagination
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="600px" destroy-on-close>
      <el-form
        ref="formRef"
        :model="formData"
        :rules="formRules"
        label-width="100px"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="formData.title" placeholder="请输入标题" />
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="formData.state" placeholder="请选择状态" style="width: 100%">
            <el-option label="未解决" value="open" />
            <el-option label="已解决" value="closed" />
            <el-option label="解决中" value="processing" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit" :loading="submitLoading">
          确定
        </el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="detailVisible" title="详情" width="500px">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="ID">{{ currentRow?.id }}</el-descriptions-item>
        <el-descriptions-item label="标题">{{ currentRow?.title }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="getStateType(currentRow?.state || '')" effect="dark">
            {{ getStateText(currentRow?.state || '') }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="创建时间">
          {{ formatDate(currentRow?.created_at || '') }}
        </el-descriptions-item>
        <el-descriptions-item label="更新时间">
          {{ formatDate(currentRow?.updated_at || '') }}
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus'
import {
  Plus,
  MoreFilled,
  Search,
  Refresh,
  Edit,
  View,
  More,
  CopyDocument,
  Delete,
} from '@element-plus/icons-vue'
import type { TableItem } from '@services/table'
import { getTable, addTable, updateTable, deleteTable } from '@services/table'
import dayjs from 'dayjs'

const loading = ref(false)
const submitLoading = ref(false)
const tableData = ref<TableItem[]>([])
const total = ref(0)
const selectedRows = ref<TableItem[]>([])

const searchForm = reactive({
  keyword: '',
  state: '',
  dateRange: [] as string[],
})

const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
})

const dialogVisible = ref(false)
const dialogType = ref<'add' | 'edit'>('add')
const currentRow = ref<TableItem | null>(null)

const detailVisible = ref(false)

const formRef = ref<FormInstance>()
const formData = reactive({
  title: '',
  state: 'open',
})

const formRules: FormRules = {
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' },
    { min: 2, max: 100, message: '标题长度在 2 到 100 个字符', trigger: 'blur' },
  ],
  state: [
    { required: true, message: '请选择状态', trigger: 'change' },
  ],
}

const dialogTitle = computed(() => (dialogType.value === 'add' ? '新建' : '编辑'))

const stateMap: Record<string, { text: string; type: '' | 'success' | 'warning' | 'info' | 'danger' }> = {
  open: { text: '未解决', type: 'danger' },
  closed: { text: '已解决', type: 'success' },
  processing: { text: '解决中', type: 'warning' },
}

function getStateText(state: string): string {
  return stateMap[state]?.text || state
}

function getStateType(state: string): '' | 'success' | 'warning' | 'info' | 'danger' {
  return stateMap[state]?.type || 'info'
}

function formatDate(date: string): string {
  if (!date) return '-'
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}

async function fetchData() {
  loading.value = true
  try {
    const params = {
      page: pagination.currentPage,
      pageSize: pagination.pageSize,
      keyword: searchForm.keyword || undefined,
      state: searchForm.state || undefined,
      startTime: searchForm.dateRange?.[0],
      endTime: searchForm.dateRange?.[1],
    }
    const response = await getTable(params)
    if (response.code === 200) {
      tableData.value = response.data.list
      total.value = response.data.total
    }
  } finally {
    loading.value = false
  }
}

function handleSearch() {
  pagination.currentPage = 1
  fetchData()
}

function handleReset() {
  searchForm.keyword = ''
  searchForm.state = ''
  searchForm.dateRange = []
  pagination.currentPage = 1
  fetchData()
}

function handleSizeChange(size: number) {
  pagination.pageSize = size
  fetchData()
}

function handleCurrentChange(page: number) {
  pagination.currentPage = page
  fetchData()
}

function handleSelectionChange(selection: TableItem[]) {
  selectedRows.value = selection
}

function handleAdd() {
  dialogType.value = 'add'
  formData.title = ''
  formData.state = 'open'
  dialogVisible.value = true
}

function handleEdit(row: TableItem) {
  dialogType.value = 'edit'
  currentRow.value = row
  formData.title = row.title
  formData.state = row.state
  dialogVisible.value = true
}

function handleView(row: TableItem) {
  currentRow.value = row
  detailVisible.value = true
}

async function handleSubmit() {
  if (!formRef.value) return

  await formRef.value.validate(async (valid) => {
    if (valid) {
      submitLoading.value = true
      try {
        if (dialogType.value === 'add') {
          const response = await addTable(formData)
          if (response.code === 200) {
            ElMessage.success('添加成功')
            dialogVisible.value = false
            fetchData()
          }
        } else {
          const response = await updateTable(currentRow.value!.id, formData)
          if (response.code === 200) {
            ElMessage.success('更新成功')
            dialogVisible.value = false
            fetchData()
          }
        }
      } finally {
        submitLoading.value = false
      }
    }
  })
}

async function handleCommand(command: string, row: TableItem) {
  switch (command) {
    case 'copy':
      try {
        await navigator.clipboard.writeText(row.title)
        ElMessage.success('复制成功')
      } catch {
        ElMessage.error('复制失败')
      }
      break
    case 'delete':
      try {
        await ElMessageBox.confirm('确定要删除这条数据吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
        const response = await deleteTable(row.id)
        if (response.code === 200) {
          ElMessage.success('删除成功')
          fetchData()
        }
      } catch {
        // 用户取消
      }
      break
  }
}

fetchData()
</script>

<style lang="scss" scoped>
.table-container {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .card-title {
      font-size: 16px;
      font-weight: 500;
    }
  }

  .search-form {
    margin-bottom: 20px;
  }

  .pagination-wrapper {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
}
</style>
